const flat = require('core-js/stable/array/flat');

describe('Array.protype.flat', () => {
    test('is function', () => {
        expect(typeof flat === 'function').toBeTruthy();
    });

    test('case1', () => {
        const arr = [1, [2, 3], [4, [5]]];
        expect(flat(arr)).toEqual([1, 2, 3, 4, [5]]);
        expect(flat(arr, 2)).toEqual([1, 2, 3, 4, 5]);
    });

    test('case2', () => {
        const arr = [1, , [2, , 3]];
        expect(flat(arr)).toEqual([1, 2, 3]);
    });

    test('case3', () => {
        const arr = [1, [2, [3, [4]]]];
        expect(flat(arr, 0)).toEqual([1, [2, [3, [4]]]]);
        expect(flat(arr, 1)).toEqual([1, 2, [3, [4]]]);
        expect(flat(arr, 2)).toEqual([1, 2, 3, [4]]);
    });
});