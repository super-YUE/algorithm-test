"use strict";

var findCandySwap = function findCandySwap(A, B) {
  var sumA = A.reduce(function (a, b) {
    return a + b;
  });
  var sumB = B.reduce(function (a, b) {
    return a + b;
  });
  var diff = (sumA - sumB) / 2;
  var ans;
  var setA = new Set(A);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = B[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var b = _step.value;
      var tag = diff + b;

      if (setA.has(tag)) {
        ans = [b, tag];
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ans;
};