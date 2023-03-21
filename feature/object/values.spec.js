const values = require('core-js/stable/object/values');

describe('Object.values', () => {
    test('is function', () => {
        expect(typeof values === 'function').toBeTruthy();
    });

    test('case1', () => {
        let object = {
            foo: 'bar', baz: 42
        };
        expect(values(object)).toEqual(['bar', 42]);
    });

    test('case2', () => {
        const object = { 100: 'a', 2: 'b', 7: 'c' };
        expect(values(object)).toEqual(['b', 'c', 'a']);
    });
});
