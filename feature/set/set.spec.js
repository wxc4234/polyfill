const Set = require('core-js/stable/set');

describe('Set', () => {
    test('is function', () => {
        expect(typeof Set === 'function').toBeTruthy();
    });
    test('methods in Set.prototype', () => {
        expect('add' in Set.prototype).toBeTruthy();
        expect('clear' in Set.prototype).toBeTruthy();
        expect('has' in Set.prototype).toBeTruthy();
        expect('delete' in Set.prototype).toBeTruthy();
        expect('forEach' in Set.prototype).toBeTruthy();
    });
    test('set size', () => {
        const set = new Set();
        set.add(1);
        set.add(2);
        set.add(3);
        set.add(2);
        set.add(1);
        expect(set.size).toBe(3);
    });
    test('set has', () => {
        const array = [];
        const set = new Set();
        set.add(NaN);
        set.add(2);
        set.add(3);
        set.add(2);
        set.add(1);
        set.add(array);
        expect(set.has(NaN)).toBeTruthy();
        expect(set.has(array)).toBeTruthy();
        expect(set.has(2)).toBeTruthy();
        expect(!set.has(4)).toBeTruthy();
        expect(!set.has([])).toBeTruthy();
    });
});
