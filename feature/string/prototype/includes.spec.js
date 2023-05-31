const includes = require('core-js/stable/string/includes');

describe('includes', () => {
    test('should return true if the string contains the specified substring', () => {
        const str = 'Hello, world!';

        expect(includes(str, 'Hello')).toBe(true);
        expect(includes(str, 'world')).toBe(true);
        expect(includes(str, '!')).toBe(true);
    });

    test('should return false if the string does not contain the specified substring', () => {
        const str = 'Hello, world!';

        expect(includes(str, 'foo')).toBe(false);
        expect(includes(str, '123')).toBe(false);
        expect(includes(str, 'Hello, everyone')).toBe(false);
    });

    test('should be case-sensitive', () => {
        const str = 'Hello, world!';

        expect(includes(str, 'hello')).toBe(false);
        expect(includes(str, 'World')).toBe(false);
    });

    it('should accept optional start position parameter', () => {
        const str = 'Hello, world!';

        expect(includes(str, 'Hello', 0)).toBe(true);
        expect(includes(str, 'Hello', 1)).toBe(false);
        expect(includes(str, 'world', 7)).toBe(true);
      });
});
