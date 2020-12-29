const Map = require('core-js/stable/map');

describe('Map', () => {
    test('is function', () => {
        expect(typeof Map === 'function').toBeTruthy();
    });
    test('methods in Map.prototype', () => {
        expect('clear' in Map.prototype).toBeTruthy();
        expect('delete' in Map.prototype).toBeTruthy();
        expect('forEach' in Map.prototype).toBeTruthy();
        expect('has' in Map.prototype).toBeTruthy();
        expect('get' in Map.prototype).toBeTruthy();
        expect('set' in Map.prototype).toBeTruthy();
    });
    test('test map set、size、delete', () => {
        const object = {};
        const map = new Map();
        map.set(NaN, 1);
        map.set(2, 1);
        map.set(3, 7);
        map.set(2, 5);
        map.set(1, 4);
        map.set(object, 9);
        expect(map.size).toBe(5);
        expect(map.delete(NaN)).toBeTruthy();
        expect(map.size).toBe(4);
        expect(!map.delete(4)).toBeTruthy();
    });
});
