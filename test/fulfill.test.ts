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
import { FetchFunction, fulfill, NoAuthority, SereneAuthorityRefreshOptions, SereneRequest, SereneRequestParseOptions, SereneRequestPrepareOptions } from "../lib";

describe("fulfill module", () => {
    describe("#fulfill", () => {
        it("should refresh authority if invalid", async () => {
            const authority = new MockAuthority();
            expect(authority.isValid).toStrictEqual(false);

            const request = new MockRequest();
            const fetch = jest.fn<FetchFunction>(async (_request) => new Response("{}"));
            await fulfill({ authority, request, fetch });

            expect(authority.isValid).toStrictEqual(true);
        });
    });
});

class MockAuthority extends NoAuthority {
    private _isValid: boolean = false;

    override get isValid(): boolean {
        return this._isValid;
    }

    override async refresh(_options: SereneAuthorityRefreshOptions): Promise<void> {
        this._isValid = true;
    }
}

class MockRequest implements SereneRequest<MockAuthority, object> {
    prepare(_options: SereneRequestPrepareOptions<MockAuthority>): Request {
        return new Request("about:blank");
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<MockAuthority>): Promise<object> {
        return await fetchResponse.json();
    }
}
