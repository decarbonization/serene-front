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
import { appendRequestSearchParams, setRequestSearchParams } from "../../lib/urls/search-params";

describe("urls#search-params", () => {
    describe("#appendRequestSearchParams", () => {
        it("should append new search params", () => {
            const original = new Request("about:blank");
            const derived = appendRequestSearchParams(original, [
                ["api_key", "1234"],
            ]);
            expect(derived.url).toStrictEqual("about:blank?api_key=1234");
        });

        it("should not remove existing search params", () => {
            const original = new Request("about:blank?scope=all&term=plants");
            const derived = appendRequestSearchParams(original, [
                ["term", "trees"],
            ]);
            expect(derived.url).toStrictEqual("about:blank?scope=all&term=plants&term=trees");
        });
    });

    describe("#setRequestSearchParams", () => {
        it("should set new search params", () => {
            const original = new Request("about:blank");
            const derived = setRequestSearchParams(original, [
                ["api_key", "1234"],
            ]);
            expect(derived.url).toStrictEqual("about:blank?api_key=1234");
        });

        it("should replace existing search params", () => {
            const original = new Request("about:blank?api_key=8675309");
            const derived = setRequestSearchParams(original, [
                ["api_key", "1234"],
            ]);
            expect(derived.url).toStrictEqual("about:blank?api_key=1234");
        });
    });
});
