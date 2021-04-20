function GetNumberOfK(numbers, k) {
  const left = 0, right = numbers.length - 1;
  let target, count = 0;
  while(left < right) {
    const mid = Math.floor((left + right) >> 1)
    if(numbers[mid] == k) {
      target = mid;
      break
    }
    if(numbers[mid] > k) {
      right = mid - 1
    }
    if(numbers[mid] < k) {
      left = mid + 1
    }
  }
  if(!target) return count
  count++
  let i = target, j = target
  while(i--) {
    if(numbers[i] == k) {
      count++
    } else {
      break
    }
  }
  while(j++) {
    if(numbers[j] == k) {
      count++
    } else {
      break
    }
  }
  return count
}

console.log(GetNumberOfK([1,2,3,4,4,4,4,5], 4))

var lengthOfLIS = function(nums) {
  let n = nums.length
  if (n <= 1) {
    return n
  }
  const tail = [nums[0]]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > tail[tail.length-1]) {
      tail.push(nums[i])
    } else {
      let left = 0, right = tail.length - 1
      while(left < right) {
        const mid = (left + right) >> 1
        if(tail[mid] < nums[i]) {
          left = mid+1
        } else {
          right = mid
        }
      }
      tail[left] = nums[i]
    }
  }
  return tail.length
}
