/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 *
 * https://leetcode-cn.com/problems/word-search/description/
 *
 * algorithms
 * Medium (42.32%)
 * Likes:    714
 * Dislikes: 0
 * Total Accepted:    125.5K
 * Total Submissions: 286.5K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
 * 
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 * 
 * 
 * 
 * 示例:
 * 
 * board =
 * [
 * ⁠ ['A','B','C','E'],
 * ⁠ ['S','F','C','S'],
 * ⁠ ['A','D','E','E']
 * ]
 * 
 * 给定 word = "ABCCED", 返回 true
 * 给定 word = "SEE", 返回 true
 * 给定 word = "ABCB", 返回 false
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * board 和 word 中只包含大写和小写英文字母。
 * 1 <= board.length <= 200
 * 1 <= board[i].length <= 200
 * 1 <= word.length <= 10^3
 * 
 * 
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const offsets = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
  ];

  return board.some((row, x) => row.some((cell, y) => dfs(x, y, 0)))

  // ********************************

  function dfs(x, y, s) {
      if (s === word.length) return true
      if (s > word.length || outsideBoard(x, y)) return false;

      if (board[x][y] !== word[s]) return false;

      const char = board[x][y]
      board[x][y] = '-'

      const res = offsets.some(([ox, oy]) => dfs(x + ox, y + oy, s + 1))
      board[x][y] = char
      return res;
  }

  function outsideBoard(x, y) {
      return x < 0 || x >= board.length || y < 0 || y >= board[0].length;
  }
};
// @lc code=end

