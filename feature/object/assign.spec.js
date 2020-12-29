const assign = require('core-js/stable/object/assign');

describe('Object.assign', () => {
    test('is function', () => {
        expect(typeof assign === 'function').toBeTruthy();
    });
    test('case1', () => {
        let object = {
            q: 1
        };
        expect(object).toEqual(assign(object, {
            bar: 2
        }));
    });
    test('case2', () => {
        expect(assign({}, {
            q: 1
        }, {
            w: 2
        })).toEqual({q: 1, w: 2});
    });
});
