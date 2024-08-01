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
 * A tuple containing the red, green, and blue components of a `Color` object.
 */
type ColorComponentTriplet = [
    number,
    number,
    number,
];

/**
 * Represents a color in the RGBA color space.
 */
export class Color {
    /**
     * Create a new color object from a given JSON representation.
     * 
     * @param raw A JSON representation of a color.
     * @returns A new color.
     */
    static revive(raw: unknown): Color {
        if (typeof raw !== 'object' || raw === null) {
            throw new Error(`<${raw}> is not a valid Color`);
        }
        return new Color(
            componentOf(raw, "red", 0.0),
            componentOf(raw, "green", 0.0),
            componentOf(raw, "blue", 0.0),
            componentOf(raw, "alpha", 1.0)
        );
    }

    /**
     * Create a color object.
     * 
     * @param red The amount of red in the color as a value in the interval [0, 1].
     * @param green The amount of green in the color as a value in the interval [0, 1].
     * @param blue The amount of blue in the color as a value in the interval [0, 1].
     * @param alpha The fraction of this color that should be applied to the pixel. Defaults to `1`.
     */
    constructor(
        public readonly red: number,
        public readonly green: number,
        public readonly blue: number,
        public readonly alpha: number = 1.0
    ) { }

    /**
     * The components of this color object, scaled to the color space of CSS and HTML.
     */
    private get rgbComponents(): ColorComponentTriplet {
        const components: ColorComponentTriplet = [
            this.red,
            this.green,
            this.blue,
        ];
        for (let i = 0, length = components.length; i < length; i++) {
            components[i] = Math.round(components[i] * 255);
        }
        return components;
    }

    /**
     * The CSS representation of this color.
     */
    get cssColor(): string {
        const [red, green, blue] = this.rgbComponents;
        if (this.alpha === 1) {
            return `rgb(${red}, ${green}, ${blue})`;
        } else {
            return `rgba(${red}, ${green}, ${blue}, ${this.alpha})`;

        }
    }

    /**
     * @ignore
     */
    toString(): string {
        return this.cssColor;
    }

    /**
     * @ignore
     */
    toJSON() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha,
        };
    }
}

/**
 * Extract a single component of a color from a JSON representation.
 * 
 * @param raw A JSON object representing a `Color`.
 * @param key The key to look up.
 * @param defaultValue The value to return if none is specified in the object.
 * @returns A color or alpha intensity value.
 */
function componentOf(raw: any, key: "red" | "green" | "blue" | "alpha", defaultValue: number): number {
    const rawComponent = raw[key];
    if (rawComponent === undefined) {
        return defaultValue;
    }
    if (typeof rawComponent !== "number") {
        throw new Error(`Color.${key} <${rawComponent}> is not a number`);
    }
    if (rawComponent < 0 || rawComponent > 1) {
        throw new RangeError(`Color.${key} <${rawComponent}> is out of range [0, 1]`);
    }
    return rawComponent;
}
