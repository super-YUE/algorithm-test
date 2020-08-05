/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode-cn.com/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (39.27%)
 * Likes:    385
 * Dislikes: 0
 * Total Accepted:    62.1K
 * Total Submissions: 153.7K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 
 * 示例 1:
 * 
 * 输入:
 * [
 * ⁠[ 1, 2, 3 ],
 * ⁠[ 4, 5, 6 ],
 * ⁠[ 7, 8, 9 ]
 * ]
 * 输出: [1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * [
 * ⁠ [1, 2, 3, 4],
 * ⁠ [5, 6, 7, 8],
 * ⁠ [9,10,11,12]
 * ]
 * 输出: [1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
	const startX = matrix[0].length;
	const endX = matrix[0].length;
	const startY = matrix.length;
	const endY = matrix.length;
	const res = []
	let endX = 0;
	let endY = 0;
	if(startY - xLength % 2 == 0 && xLength % 2 == 0) {
		endX  = xLength/2 - 1
		endY  = yLength/2
	} else if (xLength % 2 == 1 && xLength % 2 == 0) {
		endX  = Math.floor(yLength/2)
		endY  = xLength/2
	} else if (xLength % 2 == 0 && xLength % 2 == 1) {
		endX  = xLength/2
		endY  = Math.floor(yLength/2)
	} else {
		endX  = Math.floor(xLength/2)
		endY  = Math.floor(yLength/2)
	}
	const x = 0;
	const y = 0;
	
	while(x == endX && y == endY) {
		res.push(matrix[x,y])
		x++,
	}
};
// @lc code=end

