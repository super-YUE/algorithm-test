/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = right + ((left - right) >> 1);
    if(nums[mid] < nums[right]) {
      right = mid;
    } else if(nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right--;
    }
  }
  return nums[left]
};
console.log(findMin([1]))
