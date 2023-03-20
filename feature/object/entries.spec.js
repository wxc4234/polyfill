const entries = require('core-js/stable/object/entries');

describe('Object.entries', () => {
    test('is function', () => {
        expect(typeof entries === 'function').toBeTruthy();
    });

    test('case1', () => {
        const emptyObj = {};
        expect(entries(emptyObj)).toEqual([]);

        expect(entries({ a: 1, b: 'foo', c: true })).toEqual([['a', 1], ['b', 'foo'], ['c', true]]);

        const obj1 = { a: 1 };
        expect(entries(obj1)).toEqual([['a', 1]]);

        expect(entries({ 1: 'foo', 2: 'bar' })).toEqual([['1', 'foo'], ['2', 'bar']]);

        const parent = { a: 1 };
        const child = Object.create(parent);
        child.b = 'foo';
        expect(entries(child)).toEqual([['b', 'foo']]);
    });

});
