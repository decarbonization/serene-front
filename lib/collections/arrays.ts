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
 * Append the specified elements to a copy of a given array. 
 * 
 * @param array The array to append elements to.
 * @param elements The elements to append.
 * @returns A new array.
 */
export function append<T>(array: readonly T[], ...elements: readonly T[]): T[] {
    return [
        ...array,
        ...elements,
    ];
}

/**
 * Remove the specified elements from a copy of a given array.
 * 
 * @param array The array to remove elements from.
 * @param elements The elements to remove. Any elements 
 * not found in `array` are ignored.
 * @returns A new array.
 */
export function remove<T>(array: readonly T[], ...elements: readonly T[]): T[] {
    const copy = Array.from(array);
    for (const element of elements) {
        const toRemove = copy.indexOf(element);
        if (toRemove === -1) {
            // Not found.
            continue;
        }
        copy.splice(toRemove, 1);
    }
    return copy;
}

/**
 * Copy a given array and remove any non-unique elements.
 * 
 * @param array The array to find the unique elements of.
 * @returns A copy of `array` with only unique elements.
 */
export function unique<T>(array: readonly T[]): T[] {
    return Array.from(new Set(array));
}
