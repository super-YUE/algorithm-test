var reverseList = function(head) {
  let prev = null
  let cur = head
  while(cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
};

var isPalindrome = function(head) {
  if(head == null || head.next == null) return true
  let fast = head
  let slow = head
  let prev;
  while(fast && fast.next) {
    prev = slow
    slow = slow.next
    fast = fast.next.next
  }
  prev.next = null //断开
  let prev2 = null;
  while(slow) {
    const next = slow.next;
    slow.next = prev2;
    prev2 = slow;
    slow = next;
  }
  while(head && prev2) {
    if(head.val !== prev2.val) return false
    head = head.next
    prev2 = prev2.next
  }
  return true
};

var isPalindrome = function(head) {
  if(head == null || head.next == null) return true
  let fast = head, slow = head
  let prev
  while (fast && slow) {
    prev = slow
    slow = slow.next
    fast = fast.next.next
  }
  prev.next = null //断开
  let prev2 = null;
  while(slow) {
    const next = slow.next;
    slow.next = prev2;
    prev2 = slow;
    slow = next;
  }
  while(head && prev2) {
    if(head.val !== prev2.val) return false
    head = head.next
    prev2 = prev2.next
  }
  return true
}