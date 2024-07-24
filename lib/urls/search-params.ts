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
 * Create a `Request` by adding the given search parameters to an existing one.
 * 
 * @param request A request to add search parameters to.
 * @param newParams An array of name-value pairs specifying search parameters to add.
 * @returns A new request.
 */
export function appendRequestSearchParams(request: Request, newParams: [string, string][]): Request {
    const url = new URL(request.url);
    for (const [name, value] of newParams) {
        url.searchParams.append(name, value);
    }
    return new Request(url, request);
}

/**
 * Create a `Request` by setting the given search parameters to an existing one.
 * 
 * @param request A request to set search parameters on.
 * @param newParams An array of name-value pairs specifying search parameters to set.
 * @returns A new request.
 */
export function setRequestSearchParams(request: Request, newParams: [string, string][]): Request {
    const url = new URL(request.url);
    for (const [name, value] of newParams) {
        url.searchParams.set(name, value);
    }
    return new Request(url, request);
}
