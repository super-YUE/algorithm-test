"use strict";

var moveZero = function moveZero(arr) {
  var j = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[j] = arr[i];

      if (i !== j) {
        arr[i] = 0;
      }

      j++;
    }
  }
};

var maxArea = function maxArea(arr) {
  var max = 0,
      l = 0,
      r = arr.length - 1;

  while (l < r) {
    max = Math.max(max, Math.min(arr[l], arr[r]) * (r - l));

    if (arr[l] < arr[r]) {
      l++;
    } else {
      r--;
    }
  }

  return max;
};

var climbStairs = function climbStairs(n) {
  var dp1 = 0;
  dp2 = 0;
  res = 1;

  for (var i = 1; i <= n; i++) {
    dp1 = dp2;
    dp2 = res;
    res = dp1 + dp2;
  }
};

var checkPossibility = function checkPossibility(arr) {
  var count = 0;

  for (var i = 0; i < arr.length; i++) {
    var x = arr[i];
    var y = arr[i + 1];

    if (x > y) {
      count++;

      if (count > 1) {
        return false;
      }

      if (x > 0 && y < arr[i - 1]) {
        arr[i + 1] = x;
      }
    }
  }

  return true;
};

var threeSum = function threeSum(arr) {
  var ans = [];
  if (arr.length < 3) return ans;
  arr.sort(function (a, b) {
    return a - b;
  });

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > 0) break;
    if (i > 0 && arr[i] == arr[i - 1]) continue;
    var L = i + 1,
        R = arr.length - 1;

    while (L < R) {
      var sum = arr[i] + arr[L] + arr[R];

      if (sum == 0) {
        ans.push([arr[i], arr[L], arr[R]]);

        while (L < R && arr[L + 1] == arr[L]) {
          L++;
        }

        while (L < R && arr[R - 1] == arr[R]) {
          R--;
        }

        R--;
        L++;
      } else if (sum > 0) {
        R--;
      } else {
        L++;
      }
    }
  }

  return ans;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

var multiply = function multiply(num1, num2) {
  if (num1 == '0' || num2 == '0') return 0;
  var len1 = num1.length;
  var len2 = num2.length;
  var arr = new Array(len1 + len2).fill(0);
  var i = len1,
      j = len2;

  while (i) {
    i--;

    while (j) {
      j--;
      var sum = num1[i] * num2[j] + arr[i + j + 1];
      arr[i + j] += 0 | sum / 10;
      arr[i + j + 1] = sum % 10;
    }

    j = len2;
  }

  while (arr[0] == 0) {
    arr.shift();
  }

  return arr.join('');
};

var palindrome = function palindrome(str) {
  var l = 0,
      r = str.length - 1;

  while (l < r && str[l] == str[r]) {
    l++;
    r--;
  }

  return Math.abs(r - l) <= 1;
};