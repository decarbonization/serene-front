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
import { append, remove, unique } from "../../lib/collections";

describe("collections#array module", () => {
    describe("#append", () => {
        it("should not modify original array", () => {
            const original = [1, 2, 3, 4];
            append(original, 5);
            expect(original).toStrictEqual([1, 2, 3, 4]);
        });

        it("should append the given elements", () => {
            const original = [1, 2, 3, 4];
            const copy = append(original, 5, 6);
            expect(copy).toStrictEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe("#remove", () => {
        it("should not modify the original array", () => {
            const original = [1, 2, 3, 4];
            remove(original, 4);
            expect(original).toStrictEqual([1, 2, 3, 4]);
        });

        it("should remove the given elements", () => {
            const original = [1, 2, 3, 4];
            const copy = remove(original, 2, 4);
            expect(copy).toStrictEqual([1, 3]);
        });

        it("should ignore elements not in the array", () => {
            const original = [1, 2, 3, 4];
            const copy = remove(original, 2, 4, 6);
            expect(copy).toStrictEqual([1, 3]);
        });
    });

    describe("#unique", () => {
        it("should not modify the original array", () => {
            const original = [1, 2, 1, 2, 3];
            unique(original);
            expect(original).toStrictEqual([1, 2, 1, 2, 3]);
        });

        it("should remove any duplicate elements", () => {
            const original = [1, 2, 1, 2, 3];
            const copy = unique(original);
            expect(copy).toStrictEqual([1, 2, 3]);
        });
    });
});
