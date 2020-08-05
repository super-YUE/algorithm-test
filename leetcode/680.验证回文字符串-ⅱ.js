/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 *
 * https://leetcode-cn.com/problems/valid-palindrome-ii/description/
 *
 * algorithms
 * Easy (36.11%)
 * Likes:    160
 * Dislikes: 0
 * Total Accepted:    23.9K
 * Total Submissions: 63.3K
 * Testcase Example:  '"aba"'
 *
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * 
 * 示例 1:
 * 
 * 
 * 输入: "aba"
 * 输出: True
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: "abca"
 * 输出: True
 * 解释: 你可以删除c字符。
 * 
 * 
 * 注意:
 * 
 * 
 * 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
	let l = 0, r = s.length -1
	while(l < r) {
		if (s[l] != s[r]) {
			return palindrome(l + 1, r ,s) || palindrome(l, r - 1 ,s)
		}
		l++ 
		r--
	}
	return true
};
var palindrome = function(l, r, s) {
	while(l < r) {
		if(s[l] != s[r]) {
			return false
		}
		l++ 
		r--
	}
	return true
}
// @lc code=end

