const from = require('core-js/web/url');

describe('URL', () => {
    test('is function', () => {
        expect(typeof from === 'function').toBeTruthy();
    });

    test('execute', () => {
        expect(String(new URL('http://www.domain.com/a/b'))).toEqual('http://www.domain.com/a/b');
    });

    const url = new URL('http://zloirock.ru/?foo=bar');
    test('url search', () => {
        expect(url.search).toBe('?foo=bar');
    });
    test('url pathname', () => {
        expect(url.pathname).toBe('/');
    });
    test('url protocol', () => {
        expect(url.protocol).toBe('http:');
    });
});
