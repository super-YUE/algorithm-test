const multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') return 0
  for(let i = 0; i < num1.length; i++) {
    let tmp1 = num1[num1.length - 1 - i]
    for (let j = 0; j < num2.length; j++) {
      let temp2 = num2[num2.length - 1 -j];
      // let pos = res[i+j] ? res[i+j]+tem1*tem2 : temp2 * temp1
      // res[i+j]=pos%10; // 赋值给当前索引位置
      // // 目标值是否大于10 ==》是否进位 这样简化res去除不必要的"0"
      // pos >=10 && (res[i+j+1]=res[i+j+1] ? res[i+j+1]+Math.floor(pos/10) : Math.floor(pos/10));
    }
  }
  return res.reverse().join("")
}

const treeSum = function(arr) {
  let res = []
  if(arr.length < 3) {
    return []
  }
  arr.sort((a, b) => a - b)
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > 0) {
      break
    }
    if(i > 0 && arr[i] == arr[i-1]) return
    const leftIndex = i + 1
    const rightIndex = arr.length - 1
    while(leftIndex < rightIndex) {
      const sum = arr[i] + arr[leftIndex] + arr[rightIndex]
      if (sum == 0) {
        res.push({
          rightIndex,
          leftIndex,
          i
        })

        while(leftIndex < rightIndex && arr[leftIndex] == arr[leftIndex+1]) leftIndex++
        while(leftIndex < rightIndex && arr[rightIndex] == arr[rightIndex-1]) rightIndex--

        rightIndex--
        leftIndex++

      } else if (sum > 0) {
        rightIndex--
      } else if (sum < 0) {
        leftIndex++
      }
    }
  }
}

const moveZero = function(arr) {
  let j = 0
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] !== 0) {
      arr[j] = arr[i]
      if(i !== j) {
        arr[i] = 0
      }
      j++
    }
  }
}

const maxArea = function(arr) {
  let max = 0, l = 0, r = arr.length - 1
  while(l < r) {
    max = Math.max(max, Math.min(arr[l], arr[r]) * ( r - l))
    if (arr[l] < arr[r]) {
      l++
    } else {
      r--
    }
  }
  return max
}

const climbStairs = function(n) {
  let dp1 = 0; dp2 = 0; res = 1
  for(let i = 1; i <= n; i++) {
    dp1 = dp2
    dp2 = res
    res = dp1 + dp2
  }
}

var checkPossibility = function(arr) {
  let count = 0
  for(let i = 0; i < arr.length; i++) {
    const x = arr[i]
    const y = arr[i+1]
    if(x > y) {
      count++
      if(count > 1) {
        return false
      }
      if(x > 0 && y < arr[i - 1]) {
        arr[i+1] = x
      }
    }
  }
  return true
}