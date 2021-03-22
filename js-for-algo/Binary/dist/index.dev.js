"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function GetNumberOfK(numbers, k) {
  var left = 0,
      right = numbers.length - 1;
  var target,
      count = 0;

  while (left < right) {
    var mid = Math.floor(left + right >> 1);

    if (numbers[mid] == k) {
      target = mid;
      break;
    }

    if (numbers[mid] > k) {
      right = (_readOnlyError("right"), mid - 1);
    }

    if (numbers[mid] < k) {
      left = (_readOnlyError("left"), mid + 1);
    }
  }

  if (!target) return count;
  count++;
  var i = target,
      j = target;

  while (i--) {
    if (numbers[i] == k) {
      count++;
    } else {
      break;
    }
  }

  while (j++) {
    if (numbers[j] == k) {
      count++;
    } else {
      break;
    }
  }

  return count;
}

console.log(GetNumberOfK([1, 2, 3, 4, 4, 4, 4, 5], 4));

var lengthOfLIS = function lengthOfLIS(nums) {
  var n = nums.length;

  if (n <= 1) {
    return n;
  }

  var tail = [nums[0]];

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > tail[tail.length - 1]) {
      tail.push(nums[i]);
    } else {
      var left = 0,
          right = tail.length - 1;

      while (left < right) {
        var mid = left + right >> 1;

        if (tail[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      tail[left] = nums[i];
    }
  }

  return tail.length;
};

{
  var lengthOfLIS = function lengthOfLIS(nums) {
    var n = nums.length;

    if (n <= 1) {
      return n;
    }

    var tail = [nums[0]];

    for (var i = 0; i < nums.length; i++) {
      if (nums[i] > tail[tail.length - 1]) {
        tail.push(nums[i]);
      } else {
        var left = 0,
            right = tail.length - 1;

        while (left < right) {
          var mid = Math.floor((left + right) / 2);

          if (tail[mid] < nums[i]) {
            left = mid + 1;
          } else {
            right = mid;
          }
        }

        tail[left] = nums[i];
      }
    }
  };
}