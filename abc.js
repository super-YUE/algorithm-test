function f1(arg) {
  console.log(arg)
  return arg
}
function f2(arg) {
  console.log(arg)
  return arg
}
function f3(arg) {
  console.log(arg)
  return arg
}

f1(f2(f3('xx')))

// compose返回值是函数
// function compose(...args) {
//   return args.reduce((a, b) => (...args) => a(b(args)))
// }

// let res = compose(f1, f2, f3)("xxx")

// function compose(...args) {
//   return args.reduce(function(a,b) {
//     return function () {
//       a(b(arguments))
//     }
//   })
// }

function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(args)))
}

function add() {
  const args = [...arguments]
  function fn() {
    args.push(...arguments)
    return fn
  }
  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }
  return fn
}

console.log(add(1, 2).toString())

Array.prototype.MyFilter = function(cb) {
  let res = []
  let arr1 = Array.prototype.slice.call(this, 0)

  for (let i = 0; i < arr1.length; i++) {
    if (cb(this[i], i, this)) {
      res.push(arr1[i])
    }
  }
  return res
}

Array.prototype.myMap = function(cb) {
  console.log(cb)
  let res = []
  let arr = Array.prototype.slice.call(this, 0)
  for (let i = 0; i < arr.length; i++) {
    console.log(this[0])
    const item = cb(this[i], i, this)
    res.push(item)
  }
  return res
}

Array.prototype.myForEach = function(cb) {
  console.log(cb)
  let arr = Array.prototype.slice.call(this, 0)
  for (let i = 0; i < arr.length; i++) {
    cb(this[i], i, this)
  }
}

console.log([1,2,3].myMap(item => 2 * item))

const arr = [1,2,3]

arr.myForEach(item => console.log(item))

function compose(...funcs) {
  return funcs.reduce((a, b) => (...arg) => a(b(arg)))
}

function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls)
  let promise = sequence.slice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })

  let p = Promise.race(promise)
  for(let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
      promise[res] = handler(sequence[i]).then(() => {
        return res
      })
      return Promise.race(promises)
    })
  }
}
