var findPeakElement = function(nums) {
  let left = 0, right = nums.length - 1
  while(left < right) {
    const mid = left + ((right - left) >> 1)
    if(nums[mid] > nums[mid+1]) {
      right = mid; 
    } else {
      left = mid + 1;
    }
  }
  return left
};
console.log(findPeakElement([1, 3, 1,5,2]))