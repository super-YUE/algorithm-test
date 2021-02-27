var canJump = function(nums) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > k) return false
    k = Math.max(k, nums[i] + i)
  }
  return true
}

const gasStation = (gas, costs) => {
  let total = 0, cur = 0, startIndex = 0
  for (let i = 0; i < costs.length; i++) {
    cur += gas[i] - costs[i]
    if (cur < 0) {
      cur = 0
      startIndex = i + 1
    }
    total += gas[i] + costs[i]
  }
  return total > 0 ? startIndex : -1
}