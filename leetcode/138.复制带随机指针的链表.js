/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  let node = new Node()
  let _head = node
  let map = new Map()
  let cur = head
  while(cur) {
    _head.val = cur.val
    _head.next = cur.next ? new Node() : null
    map.set(cur, _head)
    _head = _head.next
    cur = cur.next
  }
  cur = head
  _head = node
  while (cur) {
    _head.random = cur.random ? map.get(cur.random) : null
    _head = _head.next
    cur = cur.next
  }
  return node
};
// @lc code=end

