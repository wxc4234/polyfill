const Promise = require('promise-polyfill');

describe('Promise', () => {
    test('is function', () => {
        expect(typeof Promise === 'function').toBeTruthy();
    });

    test('should not affect the result', () => {
        Promise.resolve(3)
            .finally(function () {
                return 'dummy';
            })
            .then(function (result) {
                expect(result).toBe(3);
                return Promise.reject(new Error('test'));
            })
            .finally(function () {
                return 'dummy';
            })
            .catch(function (reason) {
                expect(reason.message).toBe('test');
            });
    });
    test('should reject with the handler error if handler throws', () => {
        Promise.reject(new Error('test2'))
            .finally(function () {
                throw new Error('test3');
            })
            .catch(function (reason) {
                expect(reason.message).toBe('test3');
            });
    });
    test('should await any promise returned from the callback', () => {
        const log = [];
        Promise.resolve()
            .then(function () {
                log.push(1);
            })
            .finally(function () {
                return Promise.resolve()
                    .then(function () {
                        log.push(2);
                    })
                    .then(function () {
                        log.push(3);
                    });
            })
            .then(function () {
                log.push(4);
            })
            .then(function () {
                expect(log).toEqual([1, 2, 3, 4]);
            });
    });
    test('Promise.all works on multiple resolved promises', function () {
        return Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(function (data) {
            expect(data).toEqual([1, 2]);
        }
        );
    });
    test('Promise.race works on success promise', function () {
        var doneProm = Promise.resolve(10);
        var pendingProm1 = new Promise(function () {});
        var pendingProm2 = new Promise(function () {});

        return Promise.race([pendingProm1, doneProm, pendingProm2]).then(function (val) {
            expect(val).toEqual(10);
        }, function () {}
        );
    });
});
