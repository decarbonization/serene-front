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
import { LocationCoordinates } from "../../lib/data";

describe("data#location module", () => {
    describe("#LocationCoordinates", () => {
        describe("#revive", () => {
            it("should propagate values", () => {
                const subject = LocationCoordinates.revive({
                    latitude: 35.6,
                    longitude: 139.6,
                });
                expect(subject.latitude).toStrictEqual(35.6);
                expect(subject.longitude).toStrictEqual(139.6);
            });

            it("should reject invalid values", () => {
                expect(() => LocationCoordinates.revive(undefined)).toThrow();
                expect(() => LocationCoordinates.revive(null)).toThrow();
                expect(() => LocationCoordinates.revive({ latitude: "100%" })).toThrow();
                expect(() => LocationCoordinates.revive({ longitude: "very far away" })).toThrow();
            });
        });

        describe("#urlPair", () => {
            it("should include all data", () => {
                expect(new LocationCoordinates(35.689506, 139.6917).urlPair).toStrictEqual('35.689506,139.6917');
            });
        });

        describe("#truncate", () => {
            it("should reduce the accuracy of geographic coordinates", () => {
                const subject = new LocationCoordinates(35.689506, 139.6917);
                expect(subject.truncate(1)).toEqual({
                    latitude: 35.6,
                    longitude: 139.6,
                });
                expect(subject.truncate(2)).toEqual({
                    latitude: 35.68,
                    longitude: 139.69,
                });
                expect(subject.truncate(4)).toEqual({
                    latitude: 35.6895,
                    longitude: 139.6917,
                });
            });
        });

        describe("#distanceTo", () => {
            it("should return an approximate distance in meters", () => {
                const paris = new LocationCoordinates(48.8566, 2.3522);
                const krakow = new LocationCoordinates(50.0647, 19.9450);
                expect(paris.distanceTo(krakow)).toBeCloseTo(1_275.6, 0.05);
            });
        });

        describe("#toJSON", () => {
            it("should include all data", () => {
                expect(JSON.stringify(new LocationCoordinates(35.689506, 139.6917))).toStrictEqual('{"latitude":35.689506,"longitude":139.6917}');
            })
        });
    });
});
