const find = require('core-js/stable/array/find');

describe('Array.protype.find', () => {
    test('is function', () => {
        expect(typeof find === 'function').toBeTruthy();
    });

    test('case1', () => {
        const array = [1];
        const context = {};
        find(array, function (value, key, that) {
            expect(this).toBe(context);
            expect(value).toBe(1);
            expect(key).toBe(0);
            expect(that).toBe(array);
        }, context);
        expect(find([1, 3, NaN, 42, {}], it => it === 42)).toBe(42);
        expect(find([1, 3, NaN, 42, {}], it => it === 43)).toBe(undefined);
    });

});
