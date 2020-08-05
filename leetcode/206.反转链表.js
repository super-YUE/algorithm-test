/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 *
 * https://leetcode-cn.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (68.29%)
 * Likes:    993
 * Dislikes: 0
 * Total Accepted:    252K
 * Total Submissions: 363.8K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 反转一个单链表。
 * 
 * 示例:
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 * 
 * 进阶:
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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
// function ListNode(val) {
// 	   this.val = val;
// 	    this.next = null;
// }
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
	const arr = []
	let cur = head
	if(head == null) {
		return null
	}
	while(cur != null) {
		arr.push(cur)
		cur = cur.next
	}
	let newHead = new ListNode(0)
	let newList = arr.pop()
	newHead.next = newList
	while(arr.length > 0) {
		newList.next = arr.pop()
		newList = newList.next
	}
	newList.next = null
	return newHead.next
};
// @lc code=end
