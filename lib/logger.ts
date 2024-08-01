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

import { SereneAuthority } from "./authority";

/**
 * An event describing an operation which the serene-front
 * library is about to or has undertaken.
 */
export type SereneLogEvent =
    | { event: "willRefreshAuthority", authority: SereneAuthority, retry?: number }
    | { event: "willAuthenticate", authority: SereneAuthority, fetchRequest: Request }
    | { event: "willFetch", fetchRequest: Request }
    | { event: "willParse", fetchResponse: Response };

/**
 * A function which records an operation which the serene-front
 * library is about to or has undertaken.
 */
export type SereneLogger = (event: SereneLogEvent) => void;

/**
 * A logger which does nothing.
 */
export const noLogger: SereneLogger = (_event: SereneLogEvent) => { /* do nothing */ };

/**
 * A logger which prints `SereneLogEvent`s to the console as errors.
 * 
 * __Important__: This logger does not redact sensitive information.
 */
export const verboseConsoleLogger: SereneLogger = (event: SereneLogEvent) => {
    switch (event.event) {
        case "willAuthenticate":
            console.error(`+ fulfill:willAuthenticate <${event.fetchRequest.url}> using ${event.authority}`);
            break;
        case "willRefreshAuthority":
            console.error(`+ fulfill:willRefreshAuthority ${event.authority}`);
            break;
        case "willFetch":
            console.error(`+ fulfill:willFetch ${event.fetchRequest.method} <${event.fetchRequest.url}>`);
            break;
        case "willParse":
            console.error(`+ fulfill:willParse ${event.fetchResponse.status} ${event.fetchResponse.statusText}`);
            break;
    }
};
