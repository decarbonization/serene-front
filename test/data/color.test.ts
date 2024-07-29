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
import { Color } from "../../lib/data";

describe("color module", () => {
    describe("#Color", () => {
        describe("#revive", () => {
            it("should use reasonable default values", () => {
                const subject = Color.revive({});
                expect(subject.red).toStrictEqual(0.0);
                expect(subject.green).toStrictEqual(0.0);
                expect(subject.blue).toStrictEqual(0.0);
                expect(subject.alpha).toStrictEqual(1.0);
            });

            it("should propagate values", () => {
                const subject = Color.revive({
                    red: 0.3,
                    green: 0.7,
                    blue: 0.1,
                    alpha: 0.8,
                });
                expect(subject.red).toStrictEqual(0.3);
                expect(subject.green).toStrictEqual(0.7);
                expect(subject.blue).toStrictEqual(0.1);
                expect(subject.alpha).toStrictEqual(0.8);
            });

            it("should reject invalid values", () => {
                expect(() => Color.revive(undefined)).toThrow();
                expect(() => Color.revive(null)).toThrow();
                expect(() => Color.revive({ red: "100%" })).toThrow();
                expect(() => Color.revive({ green: "very" })).toThrow();
                expect(() => Color.revive({ blue: "such" })).toThrow();
                expect(() => Color.revive({ alpha: "all of it" })).toThrow();
            });

            it("should enforce value range", () => {
                expect(() => Color.revive({ red: 99 })).toThrow();
                expect(() => Color.revive({ green: -99 })).toThrow();
                expect(() => Color.revive({ blue: 99 })).toThrow();
                expect(() => Color.revive({ alpha: -99 })).toThrow();
            });
        });

        describe("#cssColor", () => {
            it("should only include alpha when <1.0", () => {
                expect(new Color(1, 1, 1).cssColor).toStrictEqual("rgb(255, 255, 255)");
                expect(new Color(0, 0, 0, 0.5).cssColor).toStrictEqual("rgba(0, 0, 0, 0.5)");
            });
        });

        describe("#toJSON", () => {
            it("should include all data", () => {
                expect(JSON.stringify(new Color(0.0, 0.5, 1.0, 1.0))).toStrictEqual('{"red":0,"green":0.5,"blue":1,"alpha":1}');
            })
        });
    });
});
