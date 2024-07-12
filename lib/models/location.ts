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
export interface LocationCoordinates {
    /**
     * A double value that describes the latitude of the coordinate.
     */
    readonly latitude: number;

    /**
     * A double value that describes the longitude of the coordinate.
     */
    readonly longitude: number;
}

/**
 * Reduce the accuracy of the given geographic location.
 * 
 * @param location The location to reduce the accuracy of.
 * @param precision The maximum number of digits to the right 
 * of the decimal point to retain on the latitude and longitude. 
 * @returns New geographic coordinates.
 */
export function truncateLocationCoordinates(
    location: LocationCoordinates, 
    precision: number
): LocationCoordinates {
    const scale = Math.pow(10, precision);
    return {
        latitude: (Math.floor(location.latitude * scale) / scale),
        longitude: (Math.floor(location.longitude * scale) / scale),
    };
}

/**
 * Calculate the approximate distance between a given pair of geographic coordinates.
 * 
 * @param lhs The first location.
 * @param rhs The second location.
 * @returns The approximate distance the specified coordinates, in kilometers.
 */
export function distanceBetweenLocationCoordinates(
    lhs: LocationCoordinates,
    rhs: LocationCoordinates
): number {
    // This uses the great circle distance formula. 
    const latitude1 = lhs.latitude * Math.PI / 180;
    const longitude1 = lhs.longitude * Math.PI / 180;
    const latitude2 = rhs.latitude * Math.PI / 180;
    const longitude2 = rhs.longitude * Math.PI / 180;

    const latitudeSpan = latitude1 - latitude2;
    const longitudeSpan = longitude1 - longitude2;

    const a = Math.pow(Math.sin(latitudeSpan / 2), 2);
    const b = Math.cos(latitude1);
    const c = Math.cos(latitude2);
    const d = Math.pow(Math.sin(longitudeSpan / 2), 2);

    return (2 * earthRadiusKm) * Math.asin(Math.sqrt(a + b * c * d));
}
