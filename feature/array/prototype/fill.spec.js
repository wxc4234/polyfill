const fill = require('core-js/stable/array/fill');

describe('Array.protype.fill', () => {
    test('is function', () => {
        expect(typeof fill === 'function').toBeTruthy();
    });

    test('case1', () => {
        const array = fill(Array(5), 5);
        expect(array).toEqual(array);
        expect(fill(Array(5), 5)).toEqual([5, 5, 5, 5, 5]);
        expect(fill(Array(5), 5, 1)).toEqual([undefined, 5, 5, 5, 5]);
    });

});
