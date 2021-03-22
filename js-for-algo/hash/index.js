var findCandySwap = (A, B) => {
  const sumA = A.reduce((a, b) => a + b)
  const sumB = B.reduce((a, b) => a + b)
  const diff = (sumA - sumB) / 2
  let ans
  const setA = new Set(A)
  for(let b of B) {
    const tag = diff + b
    if(setA.has(tag)) {
      ans = [b, tag]
      break
    }
  }
  return ans
}