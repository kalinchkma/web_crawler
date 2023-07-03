"use strict";

const {normalizeURL, getURLFromHTML} = require("./crawl");
const {test, expect} = require("@jest/globals");

// TEST: normalizeURL 
test("normalizeURL strip protocol", () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
    const input = 'https://BLOG.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test("normalizeURL strip with search params", () => {
    const input = 'http://blog.boot.dev/path/?name=somethisg&lang=bn';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

// TEST: getURLFromHTML
test("getURLFromHTML absolute", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/"> boot.dev blog</a>

        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test("getURLFromHTML relative", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"> boot.dev blog</a>

        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test("getURLFromHTML both", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/"> boot.dev blog path 1</a>
            <a href="/path2/"> boot.dev blog 2</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
    expect(actual).toEqual(expected);
});

test("getURLFromHTML invalid", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid"> boot.dev blog path 1</a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});