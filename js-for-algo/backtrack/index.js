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