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

import { describe, expect, it } from "@jest/globals";
import { appendRequestHeaders, setRequestHeaders } from "../../lib/urls/headers";

describe("urls#headers", () => {
    describe("#appendRequestHeaders", () => {
        it("should append new headers", () => {
            const original = new Request("about:blank");
            const derived = appendRequestHeaders(original, [
                ["api_key", "1234"],
            ]);
            expect(Array.from(derived.headers.entries())).toStrictEqual([
                ["api_key", "1234"],
            ]);
        });

        it("should not remove existing headers", () => {
            const original = new Request("about:blank", {
                headers: {
                    "api_key": "48484"
                },
            });
            const derived = appendRequestHeaders(original, [
                ["api_key", "1234"],
            ]);
            expect(Array.from(derived.headers.entries())).toStrictEqual([
                ["api_key", "48484, 1234"],
            ]);
        });
    });

    describe("#setRequestHeaders", () => {
        it("should set new headers", () => {
            const original = new Request("about:blank");
            const derived = setRequestHeaders(original, [
                ["api_key", "1234"],
            ]);
            expect(Array.from(derived.headers.entries())).toStrictEqual([
                ["api_key", "1234"],
            ]);
        });

        it("should replace existing headers", () => {
            const original = new Request("about:blank", {
                headers: {
                    "api_key": "8675309"
                }
            });
            const derived = setRequestHeaders(original, [
                ["api_key", "1234"],
            ]);
            expect(Array.from(derived.headers.entries())).toStrictEqual([
                ["api_key", "1234"],
            ]);
        });
    });
});
