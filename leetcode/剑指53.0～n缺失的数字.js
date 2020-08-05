function missingNumber(nums) {
  let l = 0, r = nums.length - 1;
  while(l < r) {
    const mid = l + ((r - l) >> 1)
    if(nums[mid] == mid) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return l
}