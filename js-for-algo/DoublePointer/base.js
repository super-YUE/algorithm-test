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

const removeRepeat = function(arr) {
  let j = 0
  for(let i = 0; i < arr.length; i++) {
    if(arr[j] !== arr[i]) {
      arr[++j] = arr[i]
    }
  }
  return arr.slice(0, j+1)
}
console.log(removeRepeat([1,1,1,2,3,4,5]))

// 最大的水
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

const threeSum = function(arr) {
  let ans = []
  if(arr.length < 3) return ans
  arr.sort((a, b) => a - b)
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > 0) break
    if(i > 0 && arr[i] == arr[i-1]) continue
    let L = i + 1, R = arr.length - 1
    while(L < R) {
      const sum = arr[i] + arr[L] + arr[R]
      if (sum == 0) {
        ans.push([
          arr[i],
          arr[L],
          arr[R]
        ])
        while(L < R && arr[L+1] == arr[L]) {
          L++
        }
        while(L < R && arr[R-1] == arr[R]) {
          R--
        }
        R--
        L++
      } else if(sum > 0) {
        R--
      } else {
        L++
      }
    }
  }
  return ans
}

const multiply = (num1, num2) => {
  if(num1 == '0' || num2 == '0') return 0
  let len1 = num1.length; 
  let len2 = num2.length;
  let arr = new Array(len1 + len2).fill(0)
  let i = len1, j = len2
  while(i) {
    i--
    while(j) {
      j--
      let sum = num1[i]*num2[j] + arr[i+j+1]
      arr[i+j] += 0 | sum / 10
      arr[i+j+1] = sum % 10
    }
    j=len2;
  }
  while(arr[0] == 0) {
    arr.shift()
  }
  return arr.join('')
}
console.log(multiply('123', "3123"))

const palindrome = (str) => {
  let l = 0, r = str.length - 1
  while(l < r && str[l] == str[r]) {
    l++
    r--
  }
  return Math.abs(r-l) <= 1
}


var addStrings = function(num1, num2) {
  const ans = []
  let i = num1.length -1, j = num2.length - 1, add = 0
  while(i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? parseInt(num1.charAt(i)) : 0;
    const y = j >= 0 ? parseInt(num2.charAt(j)) : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10)
    i--
    j--
  }
  return ans.reverse().join('')
}
console.log(addStrings('11','123'))



var multiply = function(num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }
  var l1 = num1.length, l2 = num2.length, p = new Array(l1 + l2).fill(0)
  for (var i = l1; i--;) {
    for (var j = l2; j--;) {
      var tmp = num1[i] * num2[j] + p[i + j + 1]
      p[i + j + 1] = tmp % 10
      p[i + j] += 0 | tmp / 10
    } 
  }
  while(p[0] === 0) {
    p.shift()
  }
  return p.join('')
};
