function getCions(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 0; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }
  return dp[amount] == Infinity ? -1 : dp[amount]
}

function rob(arr) {
  if(arr.length == 0) return 0
  if(arr.length == 1) return arr[0]
  if(arr.length == 2) return Math.max(arr[0], arr[1])
  const len = arr.length
  const dp = [arr[0], Math.max(arr[0], arr[1])]
  for(let i = 2; i < len; i++) {
    dp[i] = Math.max(arr[i-1], arr[i-2] + arr[i])
  }
  return Math.max(arr[-1], arr[i-2] + arr[i])
}

const maximalSquare = (matrix) => {
  if(!matrix.length) return 0
  let maxSquare = 0
  const rowLen = matrix.length, colLen = matrix[0].length;
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (matrix[row][col] == '1') {
        if (row != 0 && col != 0) {
          matrix[row][col] = Math.min(matrix[row][col-1], matrix[row - 1][col-1], matrix[row - 1][col]) + 1
        }
        maxSquare = Math.max(matrix[row][col], maxSquare)
      }
    }
  }
}

const uniquePaths = function(m, n) {
  if (m == 1 && n == 1) return
  const dp = []
  for(let i = 0; i < m; i++) {
    dp.push([])
    for(let j = 0; j < n; j++) {
      if(i == 0) {
        dp[0].push(1)
        continue
      }
      if(j == 0) {
        dp[i].push(1)
        continue
      }
      dp[i][j] = dp[i][j-1] + dp[i-1][j]
    }
  }
  return dp[m-1][n-1]
}

const interBreak = function(n) {
  if(n <= 3) return n - 1
  const a = n % 3
  const b = parseInt(n / 3)
  if(a == 0) {
    return 3 ** b
  } else if (a == 1) {
    return 4 * (3 ** (b-1))
  } else if (a == 2) {
    return 2 * 3 ** b 
  }
}