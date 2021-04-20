{
  function mySort(arr) {
    let fn = arguments ? typeof arguments[0] === "function" && arguments[0] : (x, y) => x - y;
    for (let i = 0; i < arr.length; i++) {
      for(let j = i + 1; j < arr.length; j++) {
        if(fn(arr[i], arr[j]) > 0) {
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
        }
      }
    }
    return arr
  }
}
{
  const twoSum = (arr, target) => {
    const map = {}
    for(let i = 0; i < arr.length; i++) {
      const tag = target - arr[i]
      if(map[tag]) {
        return [map[tag], i]
      }
      map[arr[i]] = i
    }
  }
}
{
  var addTwoNumbers = function(l1, l2) {
    let head = null, tail = null;
    let carry = 0;
    while (l1 || l2) {
      const n1 = l1 ? l1.val : 0;
      const n2 = l2 ? l2.val : 0;
      const sum = n1 + n2 + carry;
      if (!head) {
        head = tail = new ListNode(sum % 10);
      } else {
        tail.next = new ListNode(sum % 10);
        tail = tail.next;
      }
      carry = Math.floor(sum / 10);
      if (l1) {
        l1 = l1.next;
      }
      if (l2) {
        l2 = l2.next;
      }
    }
    if (carry > 0) {
      tail.next = new ListNode(carry);
    }
    return head;
  };
}