// reduce
{
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
}
// filter
{
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
}
// splice
{
  Array.prototype.splice = function(fn) {}
}
// flatten
{
  Array.prototype.flatten = function(arr) {
    return arr.reduce((a, b) => {
      return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, [])
  }
  Array.prototype.flatten = function(arr) {
    return arr.toString().split(",").map(item => +item);
  }
  function flatten(arr) {
    var result = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(flatten(arr[i]))
      } else {
        result.push(arr[i])
      }
    }  return result;
  }
  console.log(flatten([1, [2, [3, 4]]]))
}
// for of循环
{
  const arr = [1,2,3,4]
  for (const item of arr) {
    
  }
  for (let i = 0; i < arr.length; i++) {

  }
  arr.forEach((item, index) => {

  })

}
{
  const evens = [1, 3, 3, 3];
  const numbers = [1, 5, 7, 10];

  function isEven(number) {
    return number % 2 === 0;
  }
  console.log(evens.some(isEven))
  evens.some(isEven); // => true
  numbers.some(isEven); // => falseconst evens = [1, 3, 3, 3];
}