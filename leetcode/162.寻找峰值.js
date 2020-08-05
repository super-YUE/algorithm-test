var findPeakElement = function(nums) {
  let i = 0, j = nums.length - 1
  while(i < j) {
    const mid = i + ((j - i) >> 1)
    if(nums[mid] > nums[mid+1]) j = mid;
      else i = mid + 1;
  }
  return i
};
console.log(findPeakElement([1, 3, 1,5,2]))