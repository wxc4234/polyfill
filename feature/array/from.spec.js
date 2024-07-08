const from = require('core-js/stable/array/from');

describe('Array.from', () => {
    test('is function', () => {
        expect(typeof from === 'function').toBeTruthy();
    });

    test('execute', () => {
        expect(from('123')).toEqual(expect.arrayContaining(['1', '2', '3']));
    });

    test('input null throws', () => {
        expect(() => from(null)).toThrowError('object null is not iterable (cannot read property Symbol(Symbol.iterator))');
    });

    test('input undefined throws', () => {
        expect(() => from(undefined)).toThrowError('undefined is not iterable (cannot read property Symbol(Symbol.iterator))');
    });
});
