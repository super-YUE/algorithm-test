{
  function createPerson(xxx) {
    const a = new Object()
    a.xxx = xxx
    return a
  }
  function myPerson(yyy) {
    this.yyy = yyy
  }
  const myPerson = new myPerson()
}
// 寄生组合基础
{
  function superType() {

  }
  function inherit(subType, superType) {
    const property = Object.create(superType.property)
    property.constructor = subType
    subType.property = property
  }
  function subType() {
    superType.call(this)
  }
}
// 组合基础
{
  function SuperType(brand) {
    this.brand = brand;
    this.passengers = ['a','b','c']
  }
  function SubType() {
    superType.call(this)
    this.xxxx
  }
  SubType.prototype = new SuperType()
  SubType.prototype.constructor = SubType
}
{
  function createObj(obj) {
    function Obj(){}
    Obj.prototype = obj
    return new Obj()
  }
}
{
  function myNew() {
    const obj = {}
    const Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    const result = Con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }
}
{
  function myInstanceof(left, right) {
    const prototype = right.property
    left = left.__proto__
    while(true) {
      if(left === undefined || left === null) return false
      if(left == prototype) return true
      left = left.__proto__
    }
  }
}
{
  function debounce(fn, delay) {
    let timer
    return function() {
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
  function throttle(fn, time) {
    let isRun = false
    return function() {
      if(isRun) {
        return
      }
      isRun = true
      setTimeout(() => {
        fn.apply(this, arguments)
        isRun = false
      }, time);
    }
  }
}
{
  function call(context) {
    context = context || window
    context.fn = this
    const args = arguments.slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
  }
  function apply(context) {
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
      result = context.fn(...arguments[1])
    } else {
      result = context.fn()
    }
    delete context.fn
    return result
  }
}
{
  function bind(context) {
    let _this = this
    const args = arguments.slice(1)
    return function F() {
      if (this instanceof F) {
        return new _this(...args, ...arguments)
      } else {
        return _this.apply(context, args.concat(arguments))
      }
    }
  }
}
{
  function checkType(data, type = 1) {
    const dataType = typeof data
    if (dataType !== 'object') {
      return dataType
    }
    if (type == 1) {
      const typeString = Object.prototype.call(data)
      return typeString.slice(8, -1)
    } else {
      if (data.constructor == Object) {
        return 'object'
      }
      if (data.constructor == Array) {
        return 'array'
      }
    }
  }
}
{
  function flatten(data) {
    return data.reduce((a, b) => {
      return a.concat(Array.isArray(b) ? flatten(b) :b)
    }, [])
  }
  function flatten(data) {
    return data.toString().split(',').map(item => +item)
  }
  function flatten(data) {
    let res
    for(let i = 0; i < data.length; i++) {
      if(Array.isArray(data[i])) {
        res = res.concat(flatten(data[i]))
      } else {
        res.push(data[i])
      }
    }
    return res
  }
}
{
  function asyncLoop(arr, limit, fn) {
    const queues = new Array(limit + 1).fill(0).map(() => Promise.resolve())
    let index = 0
    const add = cb => {
      index = (index + 1) % limit
      return queues[index] = queues[index].then(() => cb())
    }
    let results = []
    for (const item of arr) {
      results.push(add(() => fn(item)))
    }
    return results
  }
}
{
  function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        throw new TypeError('promise must be a array')
      }
      let results = []
      let count = 0
      promises.forEach((promise, index) => {
        promise.then(res => {
          count++
          result[index] = res
          count == promises.length && resolve(results)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }
}
{
  function deepClone(data) {
    if (typeof data === 'object') {
      const result = Array.isArray(data) ? [] : {};
      for (let key in data) {
        if (typeof data[key] === 'object') {
          result[key] = deepClone(data[key]);
        } else {
          result[key] = data[key];
        }
      }
      return result;
    } else {
      return data;
    }
  }
}
