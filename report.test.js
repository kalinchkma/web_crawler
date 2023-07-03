"use strict"

const { sortPages } = require("./report");
const {test, expect} = require("@jest/globals");

// TEST: sortPages
test("sortPages 5 pages", () => {
    const input = {
        'https://wagslane.dev/blog': 9,
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/te': 4,
        'https://wagslane.dev/rr': 6,
        'https://wagslane.dev/qw': 3,

    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev/blog', 9],
        ['https://wagslane.dev/rr', 6],
        ['https://wagslane.dev/te', 4],
        ['https://wagslane.dev/qw', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected);
});

test("sortPages 3 pages", () => {
    const input = {
        'https://wagslane.dev/blog': 9,
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 4
    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev/blog', 9],
        ['https://wagslane.dev', 4],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected);
})