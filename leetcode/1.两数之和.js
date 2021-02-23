/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(arr, target) {
  const temp = {}
	for (var i = 0; i < arr.length; i++) {
		var diff = target - arr[i];
		if (temp[diff] != undefined) {
			return [temp[diff], i]
		}
		temp[arr[i]] = i
	}
};
