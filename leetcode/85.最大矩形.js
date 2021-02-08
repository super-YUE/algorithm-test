/*
 * @lc app=leetcode.cn id=85 lang=javascript
 *
 * [85] 最大矩形
 *
 * https://leetcode-cn.com/problems/maximal-rectangle/description/
 *
 * algorithms
 * Hard (47.57%)
 * Likes:    660
 * Dislikes: 0
 * Total Accepted:    47.8K
 * Total Submissions: 98.2K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：matrix =
 * [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
 * 输出：6
 * 解释：最大矩形如上图所示。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：matrix = []
 * 输出：0
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：matrix = [["0"]]
 * 输出：0
 * 
 * 
 * 示例 4：
 * 
 * 
 * 输入：matrix = [["1"]]
 * 输出：1
 * 
 * 
 * 示例 5：
 * 
 * 
 * 输入：matrix = [["0","0"]]
 * 输出：0
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * rows == matrix.length
 * cols == matrix.length
 * 0 
 * matrix[i][j] 为 '0' 或 '1'
 * 
 * 
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  const arr = []
  for (let i = 0; i < matrix.length; i++) {
    arr[i] = []
    for (let j = 0; j < matrix[i].length; j++) {
      arr[i][j] = {}
      if (matrix[i][j] == 0) {
        arr[i][j] = {
          top: 0,
          left: 0,
        }
      } else {
        if (i == 0 && j == 0) {
          arr[i][j].top = 1
          arr[i][j].left = 1
        } else if(i == 0) {
          arr[i][j].top = 1
          arr[i][j].left = arr[i][j - 1].left + 1
        } else if(j == 0) {
          arr[i][j].top = arr[i-1][j].top + 1
          arr[i][j].left = 1
        } else {
          arr[i][j].top = arr[i-1][j].top + 1
          arr[i][j].left = arr[i][j - 1].left + 1
        }
      }
    }
  }
  console.log(arr)
  let max = 0
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (i == 0 && j == 0) {
        max = matrix[i][j]
      } else if(i == 0) {
        max = Math.max(max, arr[i][j].left)
      } else if(j == 0) {
        max = Math.max(max, arr[i][j].top)
      } else {
        if (matrix[i][j] == 1) {
          const num1 = (arr[i-1][j].left + 1) * 
          Math.min(arr[i-1][j].top, arr[i][j-1].top)
          const num2 = (arr[i][j-1].top + 1) * 
          Math.min(arr[i-1][j].left, arr[i][j-1].left)
          max = Math.max(num1, num2, max)
        }
      }
    }
  }
  return max
};
// @lc code=end
console.log(maximalRectangle([["0","1"],["0","1"]]))
