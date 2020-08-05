/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个排序链表
 *
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (49.64%)
 * Likes:    662
 * Dislikes: 0
 * Total Accepted:    121.1K
 * Total Submissions: 234.9K
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 * 
 * 示例:
 * 
 * 输入:
 * [
 * 1->4->5,
 * 1->3->4,
 * 2->6
 * ]
 * 输出: 1->1->2->3->4->4->5->6
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
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
	if(!lists || lists.length == 0) return null;
	let arr = [];
	let res = new ListNode(0);
	lists.forEach(list => {
			let cur = list;
			while(cur){
					arr.push(cur.val);
					cur = cur.next;
			}
	})
	let cur = res;
	arr.sort((a,b) => a-b).forEach(val => {
			let node = new ListNode(val);
			cur.next = node;
			cur = cur.next;
	})
	return res.next;
};