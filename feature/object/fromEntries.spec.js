const fromEntries = require('core-js/stable/object/from-entries');

describe('Object.fromEntries', function() {
  it('should convert entries to object', function() {
    const entries = [['a', 1], ['b', 2]];
    const obj = fromEntries(entries);
    expect(obj).toEqual({a: 1, b: 2});
  });

  it('should throw error for non-iterable input', function() {
    expect(() => fromEntries(null)).toThrow();
    expect(() => fromEntries({})).toThrow();
  });

  it('should handle empty iterable', function() {
    expect(fromEntries([])).toEqual({});
  });
});
