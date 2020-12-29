// URL
const url = new URL('http://login:password@example.com:8080/foo/bar?a=1&b=2&a=3#fragment');
console.log('URL', url);

// Object.assign
const assign = Object.assign({
    a: 1
}, {
    b: 2
});
console.log('Object.assign', assign);

// set
const set = function () {
    var set = new Set();

    set.add(123);
    set.add(123);

    return set.has(123);
};
console.log('set', set());

// map
const map = function () {
    var key = {};
    var map = new Map();

    map.set(key, 123);

    return map.has(key) && map.get(key) === 123;
};
console.log('map', map());

// promise
const promise = function () {
    var p1 = new Promise(function (resolve, reject) {
        resolve('foo');
    });
    var p2 = new Promise(function (resolve, reject) {
        reject('quux');
    });
    var score = 0;

    function thenFn(result) {
        score += (result === 'foo');
        check();
    }
    function catchFn(result) {
        score += (result === 'quux');
        check();
    }
    function shouldNotRun(result) {
        score = -Infinity;
    }

    p1.then(thenFn, shouldNotRun);
    p2.then(shouldNotRun, catchFn);
    p1.catch(shouldNotRun);
    p2.catch(catchFn);

    p1.then(function () {
        // Promise.prototype.then() should return a new Promise
        score += p1.then() !== p1;
        check();
    });

    function check() {
        if (score === 4) {
            // asyncTestPassed();
            console.log('promise done');
        }
    }
};
console.log('promise', promise());

// symbol 
const symbol = function () {
    var object = {};
    var symbol = Symbol();
    var value = {};
    object[symbol] = value;
    return object[symbol] === value;
};
console.log('symbol', symbol());

function __createIterableObject(arr, methods) {
    methods = methods || {};
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return {};
    }

    console.log(Symbol.iterator.toString());

    arr.length++;
    var iterator = {
        'next': function () {
            return {value: arr.shift(), done: arr.length <= 0};
        },
        'return': methods.return,
        'throw': methods.throw
    };
    var iterable = {};
    iterable[Symbol.iterator] = function () {
        return iterator;
    };
    return iterable;
}
__createIterableObject([]);

// fetch
fetch('/users.html')
    .then(function (response) {
        if (response.status === 404) {
            console.log('fetch 404 ok');
        }
    });
fetch('/all.js')
    .then(function (response) {
        if (response.status === 200) {
            console.log('fetch 200 ok');
        }
    });

// Array.from
console.log('Array.from', Array.from('123'));

// Array.findInex
console.log('Array.findInex', [1, 2, 3].findIndex(val => val === 2));

// Array.find
console.log('Array.find', [1, 2, 3].find(val => val > 1));

// Array.fill
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
arr1.fill(7);
console.log('Array.fill', arr1);