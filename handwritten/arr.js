// reduce
Array.prototype.reduce = function(fn, value) {
  if(typeof fn !== 'function') {
    console.log("第一个参数需要为函数")
    return
  }
  const acc = value || this[0]
  const startIndex = value ? 0 : 1
  for(let i = startIndex; i < this.length; i++) {
    fn(acc, this[i], i, this)
  }
  return acc
}

// filter
Array.prototype.filter = function(fn) {
  let arr = []
  let arr1 = Array.prototype.slice.call(this, 0, this.length)

  for (let i = 0; i < arr1.length; i++) {
    if (fn(this[i], i, this)) {
      arr.push(arr1[i])
    }
  }
  return arr
}

// splice
Array.prototype.splice = function(fn) {
  
}