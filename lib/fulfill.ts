/*
 * MIT No Attribution
 * 
 * Copyright 2024 Peter "Kevin" Contreras
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { SereneAuthority } from "./authority";
import { RESTError } from "./error";
import { FetchFunction, defaultFetch } from "./fetch";
import { SereneLogger, noLogger } from "./logger";
import { SereneRequest } from "./request";

/**
 * An object describing a request to fulfill using a service 
 * and how that request should be issued.
 */
export interface SereneFulfillOptions<Authority extends SereneAuthority, Result> {
    /**
     * The object to use to authenticate the `request` to a service.
     */
    readonly authority: Authority;

    /**
     * An object encapsulating a request to a RESTful API service.
     */
    readonly request: SereneRequest<Authority, Result>;

    /**
     * The fetch function to use to perform network operations.
     */
    readonly fetch?: FetchFunction;

    /**
     * The logger to use to record the internal operations of the perform function.
     */
    readonly logger?: SereneLogger;
}

/**
 * Issue a request to a service, returning a promise 
 * that is fulfilled once the response is available.
 * 
 * @param options An object describing what request to make 
 * and how to make it.
 * @returns A promise representing the response from the service.
 */
export async function fulfill<A extends SereneAuthority, R>({
    authority,
    request,
    fetch = defaultFetch,
    logger = noLogger,
}: SereneFulfillOptions<A, R>): Promise<R> {
    if (!authority.isValid) {
        logger({ event: "willRefreshAuthority", authority });
        await authority.refresh({ fetch });
    }
    for (let retry = 0, retryLimit = authority.retryLimit; retry <= retryLimit; retry++) {
        const unauthenticatedFetchRequest = request.prepare({ authority });
        logger({ event: "willAuthenticate", authority, fetchRequest: unauthenticatedFetchRequest });
        const fetchRequest = await authority.authenticate({ fetchRequest: unauthenticatedFetchRequest });
        logger({ event: "willFetch", fetchRequest });
        const fetchResponse = await fetch(fetchRequest);
        if (!fetchResponse.ok && fetchResponse.status === 401) {
            logger({ event: "willRefreshAuthority", authority, retry });
            await authority.refresh({ fetch });
            continue;
        }
        logger({ event: "willParse", fetchResponse });
        return await request.parse({ authority, fetchResponse });
    }
    throw new RESTError(401, "Unauthorized", "Retry limit exceeded");
}
