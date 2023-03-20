const includes = require('core-js/stable/array/includes');

describe('Array.protype.includes', () => {
    test('is function', () => {
        expect(typeof includes === 'function').toBeTruthy();
    });

    test('case1', () => {
        const object = {};
        const array = [1, 2, 3, -0, object];
        expect(includes(array, 1)).toBeTruthy;
        expect(includes(array, -0)).toBeTruthy;
        expect(includes(array, 3)).toBeTruthy;
        expect(includes(array, 11)).not.toBeTruthy;
        expect(includes(array, 11)).not.toBeTruthy;
        expect(includes(Array(1), undefined)).toBeTruthy;
        expect(includes(array, {})).not.toBeTruthy
    });

});
