const findIndex = require('core-js/stable/array/find-index');

describe('Array.protype.findIndex', () => {
    test('is function', () => {
        expect(typeof findIndex === 'function').toBeTruthy();
    });

    test('case1', () => {
        const array = [1];
        const context = {};
        findIndex(array, function (value, key, that) {
            expect(this).toBe(context);
            expect(value).toBe(1);
            expect(key).toBe(0);
            expect(that).toBe(array);
        }, context);
        expect(findIndex([1, 3, NaN, 42, {}], it => it === 42)).toBe(3);
    });

});
