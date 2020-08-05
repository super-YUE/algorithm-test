/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (36.76%)
 * Likes:    988
 * Dislikes: 0
 * Total Accepted:    243.5K
 * Total Submissions: 655.3K
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 示例 1:
 * 
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 * 
 * 
 * 示例 2:
 * 
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 * 
 * 
 * 说明:
 * 
 * 所有输入只包含小写字母 a-z 。
 * 
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
	if(!strs.length) return "";
    //优化后 执行用时:56ms,击败了98.58% 内存消耗:33.7MB,击败了96.97%
    //直接先找出最短字符串长度 再使用深度遍历法
    let len = strs[0].length;
    for(let str of strs){
        len = Math.min(len, str.length);
    }
    let s = strs[0].substr(0, len), index = 1;
    while(index < strs.length){
        while(strs[index].indexOf(s)){
            s = s.substr(0, s.length - 1);
            if(!s.length) { return "" }
        }
        index++;
    }
    return s;
};
// @lc code=end

