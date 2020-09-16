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
var twoSum = function(nums, target) {
  const temp = {}
	for (var i = 0; i < nums.length; i++) {
		var diff = target - nums[i];
		if (temp[diff] != undefined) {
			return [temp[diff], i]
		}
		temp[nums[i]] = i
	}
};
