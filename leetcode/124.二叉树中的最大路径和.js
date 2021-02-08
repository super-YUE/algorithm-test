/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
 *
 * https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/description/
 *
 * algorithms
 * Hard (42.97%)
 * Likes:    713
 * Dislikes: 0
 * Total Accepted:    76.5K
 * Total Submissions: 177.2K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个非空二叉树，返回其最大路径和。
 * 
 * 本题中，路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：[1,2,3]
 * 
 * ⁠      1
 * ⁠     / \
 * ⁠    2   3
 * 
 * 输出：6
 * 
 * 
 * 示例 2：
 * 
 * 输入：[-10,9,20,null,null,15,7]
 * 
 * -10
 * / \
 * 9  20
 * /  \
 * 15   7
 * 
 * 输出：42
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
  let max = root.val
  var dfs = function(node) {
    if(!node) return 0
    const leftVal = dfs(node.left)
    const rightVal = dfs(node.right)
    const nodeVal = node.val
    const myMax = Math.max(leftVal + nodeVal, 
      rightVal + nodeVal, 
      nodeVal)
    max = Math.max(max, myMax, leftVal + nodeVal + rightVal)
    return myMax
  }
  dfs(root)
  return max
};

// @lc code=end

