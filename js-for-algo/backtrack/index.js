var subsets = function(arr) {
  const res = []
  const n = arr.length
  const backTrack = (path, i) => {
    if (i <= n) {
      res.push(path)
    }
    for(let j = i; j < n; j++) {
      path.push(arr[j])
      backTrack(path.slice(0), j + 1)
      path.pop()
    }
  }
  backTrack([], 0)
  return res
}
console.log(subsets([1,2,3]))

var subsets = function(arr) {
  const res = []
  const n = arr.length
  const backTrack = (path, i) => {
    if (i <= n) {
      res.push(path)
    }
    for(let j = i; j < n; j++) {
      path.push(arr[j])
      backTrack(path.slice(0), j + 1)
      path.pop()
    }
  }
  backTrack([], 0)
  return res
}

var rob = function(arr) {
  if(!arr.length) return 0
  if(arr.length == 1) return arr[0]
  if(arr.length == 2) return Math.max(arr[0], arr[1])
  const dp = [arr[0], Math.max(arr[0], arr[1])]
  for(let i = 2; i < arr.length; i++) {
    dp[i] = Math.max(arr[i] + dp[i-2], dp[i-1])
  }
  return Math.max(dp[arr.length - 1], dp[arr.length - 2])
}

const maximalSquare = (matrix) => {
  if(!matrix.length) return 0
  let maxSquare = 0
  const rowLen = matrix.length, colLen = matrix[0].length
  for(let row = 0; row < rowLen; row++) {
    for(let col = 0; col < colLen; col++) {
      if(matrix[row][col] == '1') {
        if(row != 0 && col != 0) {
          matrix[row][col] = Math.min(matrix[row - 1][col], matrix[row][col - 1], matrix[row - 1][col - 1]) + 1
        }
        maxSquare = Math.max(matrix[row][col], maxSquare)
      }
    }
  }
  return maxSquare ** 2
}

var coinChange = function(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for(let i = 0; i <= amount; i++) {
    for(let con of coins) {
      if(i >= coins) {
        dp[i] = Math.min(dp[i], dp[i - con] + 1)
      }
    }
  }
  return dp[amount] == Infinity ? -1 : dp[amount]
}
