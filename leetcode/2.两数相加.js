/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (37.00%)
 * Likes:    4119
 * Dislikes: 0
 * Total Accepted:    374.7K
 * Total Submissions: 1M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 示例：
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 * 
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
	let node = new ListNode("head")
	let temp = node,
			sum, n = 0
	while(l1 || l2){
		const n1 = l1 ? l1.val : 0;
		const n2 = l2 ? l2.val : 0;
		sum = n1 + n2 + n;
		temp.next = new ListNode(sum % 10)
		temp = temp.next
		n = parseInt( sum / 10)
		if(l1) l1 = l1.next
		if(l2) l2 = l2.next
	}
	if(n > 0) temp.next = new ListNode(n)
	return node.next
};
// @lc code=end


var addTwoNumbers = function(l1, l2) {
	let node = new ListNode('head')
	let temp = node,
		sum,n = 0
	while(l1 || l2) {
		const n1 = l1 ? l1.val : 0;
		const n2 = l2 ? l2.val : 0;
		sum = n1 + n2 + n;
		temp.next = new LitstNode(sum % 10)
		temp = temp.next
		n = parseInt( sum/10)
		if(l1) l1 = l1.next
		if(l2) l2 = l2.next
	}
}