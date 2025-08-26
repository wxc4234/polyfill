(function(undefined) {
    function ToObject(e) {
        if (null === e || e === undefined)
            throw TypeError();
        return Object(e)
    }
    function ToLength(n) {
        var t = ToInteger(n);
        return t <= 0 ? 0 : Math.min(t, Math.pow(2, 53) - 1)
    }
    function ToInteger(n) {
        var i = Number(n);
        return isNaN(i) ? 0 : 1 / i === Infinity || 1 / i == -Infinity || i === Infinity || i === -Infinity ? i : (i < 0 ? -1 : 1) * Math.floor(Math.abs(i))
    }
  
    if (!("flat" in Array.prototype)) {
        Object.defineProperty(Array.prototype, "flat", {
            value: function(depth) {
                var O = ToObject(this);
                var sourceLen = ToLength(O.length);
                var depthNum = depth === undefined ? 1 : ToInteger(depth);
                var A = [];
                var flattenIntoArray = function(target, source, sourceLen, start, depthNum) {
                    var targetIndex = start;
                    var sourceIndex = 0;
                    
                    while (sourceIndex < sourceLen) {
                        var P = String(sourceIndex);
                        if (source.hasOwnProperty(P)) {
                            var element = source[P];
                            if (depthNum > 0 && Array.isArray(element)) {
                                var elementLen = ToLength(element.length);
                                targetIndex = flattenIntoArray(target, element, elementLen, targetIndex, depthNum - 1);
                            } else {
                                if (targetIndex >= Math.pow(2, 53) - 1) {
                                    throw new TypeError('Exceeded maximum array length');
                                }
                                target[targetIndex] = element;
                                targetIndex++;
                            }
                        }
                        sourceIndex++;
                    }
                    return targetIndex;
                };
                
                flattenIntoArray(A, O, sourceLen, 0, depthNum);
                return A;
            },
            writable: true,
            configurable: true
        });
    }
  }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});