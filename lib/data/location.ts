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

/**
 * The approximate radius of the earth in kilometers.
 */
const earthRadiusKm: number = 6_371;

/**
 * An object that describes a location in terms of its longitude and latitude.
 */
export class LocationCoordinates {
    /**
     * Convert a string containing a geographic coordinate into a number.
     * 
     * @throws `TypeError` if `subject` is not a valid finite number.
     * @param subject A string containing a geographic coordinate.
     * @returns A numeric geographic coordinate.
     */
    static parseCoordinate(subject: string): number {
        const coordinate = parseFloat(subject);
        if (!Number.isFinite(coordinate)) {
            throw new TypeError(`<${subject}> is not a valid coordinate`);
        }
        return coordinate;
    }


    /**
     * Create a new location coordinates object from a given JSON representation.
     * 
     * @param raw A JSON representation of location coordinates.
     * @returns A new location coordinates object.
     */
    static revive(raw: unknown): LocationCoordinates {
        if (typeof raw !== 'object' || raw === null) {
            throw new Error(`<${raw}> is not a valid LocationCoordinates`);
        }
        return new LocationCoordinates(
            coordinateOf(raw, "latitude"),
            coordinateOf(raw, "longitude")
        );
    }

    /**
     * Create a location coordinates object.
     * 
     * @param latitude A double value that describes the latitude of the coordinate.
     * @param longitude A double value that describes the longitude of the coordinate.
     */
    constructor(
        public readonly latitude: number,
        public readonly longitude: number
    ) { }

    /**
     * Convert these coordinates into a pair which can be embedded into a URL.
     */
    get urlPair(): string {
        return `${this.latitude},${this.longitude}`;
    }

    /**
     * Reduce the accuracy of this geographic location.
     * 
     * @param precision The maximum number of digits to the right 
     * of the decimal point to retain on the latitude and longitude. 
     * @returns New geographic coordinates.
     */
    truncate(precision: number): LocationCoordinates {
        const scale = Math.pow(10, precision);
        return new LocationCoordinates(
            (Math.floor(this.latitude * scale) / scale),
            (Math.floor(this.longitude * scale) / scale)
        );
    }

    /**
     * Calculate the approximate distance between these geographic coordinates and another pair.
     * 
     * @param other The other location.
     * @returns The approximate distance the specified coordinates, in kilometers.
     */
    distanceTo(other: LocationCoordinates): number {
        // This uses the great circle distance formula. 
        const latitude1 = this.latitude * Math.PI / 180;
        const longitude1 = this.longitude * Math.PI / 180;
        const latitude2 = other.latitude * Math.PI / 180;
        const longitude2 = other.longitude * Math.PI / 180;

        const latitudeSpan = latitude1 - latitude2;
        const longitudeSpan = longitude1 - longitude2;

        const a = Math.pow(Math.sin(latitudeSpan / 2), 2);
        const b = Math.cos(latitude1);
        const c = Math.cos(latitude2);
        const d = Math.pow(Math.sin(longitudeSpan / 2), 2);

        return (2 * earthRadiusKm) * Math.asin(Math.sqrt(a + b * c * d));
    }

    /**
     * @ignore
     */
    toString(): string {
        return `{ latitude: ${this.latitude}, longitude: ${this.longitude} }`;
    }

    /**
     * @ignore
     */
    toJSON() {
        return {
            latitude: this.latitude,
            longitude: this.longitude,
        };
    }
}

/**
 * Extract a single component of some location coordinates from a JSON representation.
 * 
 * @param raw A JSON object representing a `LocationCoordinates`.
 * @param key The key to look up.
 * @returns A coordinate value.
 */
function coordinateOf(raw: any, key: "latitude" | "longitude"): number {
    const rawComponent = raw[key];
    if (typeof rawComponent !== "number") {
        throw new Error(`LocationCoordinate.${key} <${rawComponent}> is not a number`);
    }
    return rawComponent;
}
