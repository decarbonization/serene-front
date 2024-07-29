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
 * Create a `Request` by adding the given headers to an existing one.
 * 
 * @param request A request to add headers to.
 * @param newHeaders An array of name-value pairs specifying headers to add.
 * @returns A new request.
 */
export function appendRequestHeaders(request: Request, newHeaders: [string, string][]): Request {
    const headers = new Headers(request.headers);
    for (const [name, value] of newHeaders) {
        headers.append(name, value);
    }
    return new Request(request.url, {
        ...request,
        headers
    });
}

/**
 * Create a `Request` by setting the given headers to an existing one.
 * 
 * @param request A request to set headers on.
 * @param newHeaders An array of name-value pairs specifying headers to set.
 * @returns A new request.
 */
export function setRequestHeaders(request: Request, newHeaders: [string, string][]): Request {
    const headers = new Headers(request.headers);
    for (const [name, value] of newHeaders) {
        headers.set(name, value);
    }
    return new Request(request.url, {
        ...request,
        headers
    });
}
