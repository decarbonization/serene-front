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

import { describe, expect, it, jest } from "@jest/globals";
import { FetchFunction, fulfill, SereneAuthority, SereneRequest, SereneRequestParseOptions, SereneRequestPrepareOptions } from "../lib";

describe("fulfill module", () => {
    describe("#fulfill", () => {
        it("should refresh authority if invalid", async () => {
            let isValid = false;
            const refresh = jest.fn(async () => { isValid = true });
            const authenticate = jest.fn(async () => { });
            const authority: SereneAuthority = {
                retryLimit: 1,
                get isValid(): boolean {
                    return isValid;
                },
                refresh,
                authenticate,
            };

            const request = new MockRequest();
            const fetch = jest.fn<FetchFunction>(async (_request) => new Response("{}"));
            await fulfill({ authority, request, fetch });

            expect(refresh.mock.calls).toHaveLength(1);
            expect(isValid).toStrictEqual(true);
        });

        it("should refresh authority if 401 is returned", async () => {
            const refresh = jest.fn(async () => { });
            const authenticate = jest.fn(async () => { });
            const authority: SereneAuthority = {
                retryLimit: 1,
                isValid: true,
                refresh,
                authenticate,
            };

            const request = new MockRequest();
            let isFirstFetchCall = true;
            const fetch = jest.fn<FetchFunction>(async (_request) => {
                if (isFirstFetchCall) {
                    isFirstFetchCall = false;
                    return new Response("{}", { status: 401 });
                } else {
                    return new Response("{}");
                }
            });
            await fulfill({ authority, request, fetch });

            expect(refresh.mock.calls).toHaveLength(1);
        });

        it("should throw an error if all retries are exhausted", () => {
            const refresh = jest.fn(async () => { });
            const authenticate = jest.fn(async () => { });
            const authority: SereneAuthority = {
                retryLimit: 1,
                isValid: false,
                refresh,
                authenticate,
            };

            const request = new MockRequest();
            const fetch = jest.fn<FetchFunction>(async (_request) => new Response("{}", { status: 401 }));
            expect(fulfill({ authority, request, fetch })).rejects.toThrow();
        });
    });
});

class MockRequest implements SereneRequest<SereneAuthority, object> {
    prepare(_options: SereneRequestPrepareOptions<SereneAuthority>): Request {
        return new Request("about:blank");
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<SereneAuthority>): Promise<object> {
        return await fetchResponse.json();
    }
}
