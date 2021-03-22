var canJump = function(num) {
  let k = 0;
  for (let i = 0; i < num.length; i++) {
    if (i > k) return false
    k = Math.max(k, num[i] + i)
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


var maxProfit = function(prices) {
  let res = 0;
  let buy = Number.MAX_VALUE
  for(let i = 0; i < prices.length; i++) {
    buy = Math.min(buy, prices[i])
    res = Math.max(res, prices[i] - buy)
  }
  return res
}

var maxProfit2 = function(prices) {
  let res = 0;
  for(let i = 1; i < prices.length; i++) {
    res += Math.max(0, prices[i] - prices[i - 1])
  }
  return res
}

var numEquivDominoPairs = function(dominos) {
  let obj = {}
  let res = 0
  for(let [node1, node2] of dominos) {
    const str = node1 > node2 ? `${node2}${node1}` : `${node1}${node2}`
    if(obj[str]) res += obj[str]
    obj[str] = (obj[str] || 0) + 1
  }
  return res
}

var integerBreak = function(n) {
  if(n <= 3) return n - 1
  const a = n % 3
  const b = parseInt(n / 3)
  if(a == 0) {
    return 3 ** b
  } else if(a == 1) {
    return 4 * (3 ** (b -1))
  } else {
    return 2 * 3 ** b
  }
}

var canJump = function(arr) {
  let k = 0;
  for(let i = 0; i < arr.length; i++) {
    if(k < i) return false
    k = Math.max(k, arr[i] + i)
  }
  return true
}

var canCompleteCircuit = function(gas, cost) {
  let total = 0
  let cur = 0
  let start = 0
  for(let i = 0; i < gas.length; i++) {
    cur += gas[i] - cost[i]
    if(cur < 0) {
      start = i + 1
      cur = 0
    }
    total += gas[i] - cost[i]
  }
  return total >= 0 ? start : -1
}