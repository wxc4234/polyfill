const from = require('core-js/stable/array/from');

describe('Array.from', () => {
    test('is function', () => {
        expect(typeof from === 'function').toBeTruthy();
    });

    test('execute', () => {
        expect(from('123')).toEqual(expect.arrayContaining(['1', '2', '3']));
    });

    test('input null throws', () => {
        expect(() => from(null)).toThrowError('Cannot convert undefined or null to object');
    });

    test('input undefined throws', () => {
        expect(() => from(undefined)).toThrowError('Cannot convert undefined or null to object');
    });
});
