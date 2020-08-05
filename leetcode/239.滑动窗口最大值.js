/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 *
 * https://leetcode-cn.com/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (45.51%)
 * Likes:    373
 * Dislikes: 0
 * Total Accepted:    50.4K
 * Total Submissions: 105.6K
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k
 * 个数字。滑动窗口每次只向右移动一位。
 * 
 * 返回滑动窗口中的最大值。
 * 
 * 
 * 
 * 进阶：
 * 
 * 你能在线性时间复杂度内解决此题吗？
 * 
 * 
 * 
 * 示例:
 * 
 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7] 
 * 解释: 
 * 
 * ⁠ 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
	let left = 0;
	right = k - 1;
	const outPut = []
	let max = -1
	let maxIndex = -1
	while(right < nums.length) {
		if(maxIndex < left) {
			const maxObj= findMax(left, right, nums)
			max = maxObj.max
			maxIndex = maxObj.maxIndex
			outPut.push(max)
		} else if (nums[right] < max) {
			outPut.push(max)
		} else if (nums[right] >= max) {
			max = nums[right]
			maxIndex = right
			outPut.push(max)
		}
		left++
		right++
	}
	console.log(outPut)
	return outPut
};
var findMax = function(left, right, nums) {
	let max = nums[left]
	let maxIndex = left
	for(let i = left; i++; i <= right) {
		if(nums[i] > max) {
			max = nums[i]
			maxIndex = i
		}
	}
	return {
		max, maxIndex
	}
}
// @lc code=end
maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)