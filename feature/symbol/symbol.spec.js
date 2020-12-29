const Symbol = require('core-js/stable/symbol');

describe('symbol', () => {
    test('is function', () => {
        expect(typeof Symbol === 'function').toBeTruthy();
    });
    test('symbol unqiue', () => {
        const symbol1 = Symbol('symbol');
        const symbol2 = Symbol('symbol');
        expect(symbol1).not.toEqual(symbol2);

        const object = {};
        object[symbol1] = 42;
        expect(object[symbol1] === 42).toBeTruthy();
        expect(object[symbol2] !== 42).toBeTruthy();
    });
    test('symbol type', () => {
        expect(typeof Symbol() === 'symbol').toBeTruthy();
    });
    test('Well-known Symbols', () => {
        const wks = [
            'hasInstance',
            'isConcatSpreadable',
            'iterator',
            'match',
            'matchAll',
            'replace',
            'search',
            'species',
            'split',
            'toPrimitive',
            'toStringTag',
            'unscopables'
        ];
        for (const name of wks) {
            expect(name in Symbol).toBeTruthy();
            expect(Object(Symbol[name]) instanceof Symbol).toBeTruthy();
        }
    });

    test('Global symbol registry', () => {
        expect(typeof Symbol.for === 'function').toBeTruthy();
        expect(typeof Symbol.keyFor === 'function').toBeTruthy();
        const symbol = Symbol.for('foo');
        expect(Symbol.for('foo')).toStrictEqual(symbol);
        expect(Symbol.keyFor(symbol)).toStrictEqual('foo');
    });
});
