"use strict";

var reverseList = function reverseList(head) {
  var prev = null;
  var cur = head;

  while (cur) {
    var next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};

var isPalindrome = function isPalindrome(head) {
  if (head == null || head.next == null) return true;
  var fast = head;
  var slow = head;
  var prev;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = null; //断开

  var prev2 = null;

  while (slow) {
    var next = slow.next;
    slow.next = prev2;
    prev2 = slow;
    slow = next;
  }

  while (head && prev2) {
    if (head.val !== prev2.val) return false;
    head = head.next;
    prev2 = prev2.next;
  }

  return true;
};

var isPalindrome = function isPalindrome(head) {
  if (head == null || head.next == null) return true;
  var fast = head,
      slow = head;
  var prev;

  while (fast && slow) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  prev.next = null; //断开

  var prev2 = null;

  while (slow) {
    var next = slow.next;
    slow.next = prev2;
    prev2 = slow;
    slow = next;
  }

  while (head && prev2) {
    if (head.val !== prev2.val) return false;
    head = head.next;
    prev2 = prev2.next;
  }

  return true;
};