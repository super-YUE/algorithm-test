{
  function deepClone(obj, cache = new WeekMap()) {
    if(!obj instanceof Object) return obj
    if(cache.get(obj)) return cache.get(obj)

    if(obj instanceof Function) {
      return function() {
        obj.apply(this, arguments)
      }
    }

    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)

    const res = Array.isArray(obj) ? [...obj] : { ...obj }

    cache.set(obj, res)

    Object.keys().forEach(key => {
      if(obj[key] instanceof Object) {
        res[key] = deepClone(obj[key], cache)
      } else {
        res[key] = obj[key]
      }
    })
    
    return res
  }
}
{
  function myInstanceOf(left, con) {
    left = left.__proto__
    con = con.prototype
    while(true) {
      if(left === undefined || left === null) return false
      if(left == property) return true
      left = left.__proto__
    }
  }
}
{
  function factory(xxx) {
    const obj = {}
    obj.xxx = xxx
    return obj
  }
}

{
  function Con(xxx) {
    this.xxx = xxx
  }

  const a = myNew(Con)

  function myNew(con) {
    const obj = {}
    obj.__proto__ = con.property
    const result = con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }
}

{
  function F() {}
  F.prototype.xxx = "xxx"
}

{
  function F(xxx) {
    this.xxx = xxx
    this.passengers = [1, 2, 3, 4, 5]
  }
  F.prototype = {
    constructor: F,
    getFunction: () => {
      return this.xxx
    }
  }
}

{
  function SuperType(xxx) {
    this.xxx = xxx
  }
  SuperType.prototype.getXXX = function() {
    return this.xxx
  }
  function SubType() {

  }
  SubType.prototype = new SuperType()
}

{
  function SuperType(xxx) {
    this.xxx = xxx
  }
  function SubType() {
    SuperType.call(this, name);
  }
}
{
  function SuperType(xxx) {
    this.xxx = xxx
  }
  SuperType.prototype.getBrand = function() {
    return this.xxx
  }
  function SubType() {
    SuperType.call(this, name)
  }
  SubType.prototype = new SuperType()
  SubType.prototype.constructor = SubType
}
{
  function SuperType(xxx) {
    this.xxx = xxx
  }
  SuperType.prototype.getBrand = function() {
    return this.xxx
  }
  function SuperType(name) {
    SuperType.call(this, name)
  }

  function MyCreate(obj) {
    function F(){}
    F.prototype = obj
    return new F()
  }
  const midObj = MyCreate(SuperType.prototype)
  midObj.constructor = SubType
  SubType.prototype = midObj

  const midObj = MyCreate(SuperType.prototype)
  midObj.constructor = SubType
  SubType.prototype = midObj
  // const midObj = MyCreate(SuperType.prototype)
  // midObj.constructor = SubType
  // SubType.prototype = midObj
}


{
  function myCall(context) {
    if(typeof this !== 'function') {
      throw new Error('this must be a function')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const res = context.fn(...args)
    delete context.fn
    return res
  }
  function myApply() {
    if(typeof this !== 'function') {
      throw new Error('this must be a function')
    }
    context = context || window
    context.fn = this
    const args = arguments[1]
    let res
    if (args) {
      res = context.fn(...args)
    } else {
      res = context.fn()
    }
    return res
  }
  function myBind(context) {
    const _this = this
    context = context || window
    const args = [...arguments].slice(1)
    return function F() {
      if(this instanceof F) {
        return _this(...args, ...arguments)
      } else {
        return _this.apply(context, args.concat(arguments))
      }
    }
  }
}
{
  function debounce(func, time) {
    let timer
    return function() {
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, time);
    }
  }

  function throttle(func, time) {
    let last = 0
    return function() {
      let now = Date.now()
      if (now - last >= time) {
        last = now
        func.apply(this, arguments)
      }
    }
  }

  function throttle(func, time) {
    let canRun = true
    return function() {
      if(!canRun) return
      canRun = false
      setTimeout(() => {
        func.apply(this, arguments)
        canRun = true
      }, time);
    }
  }

  function getType(data) {
    const objType = Object.prototype.toString.call(data)
    return objType.slice(8, -1).toLowerCase()
  }
  console.log(getType(123))
}
{
  function myReduce(fn, value) {
    if(typeof fn !== 'function') {
      console.log("第一个参数需要为函数")
      return
    }
    let cur = value
    let startIndex = 0
    if(cur === undefined) {
      cur = this[0]
      startIndex = 1
    }
    for(let i = startIndex; i < this.length; i++) {
      cur = fn(cur, this[i], i, this)
    }
    return cur
  }
}
{
  function myReduce(fn, value) {
    if(typeof fn !== 'function') {
      console.log("第一个参数需要为函数")
      return
    }
    let cur = value
    let startIndex = 0
    if(cur === undefined) {
      cur = this[0]
      startIndex = 1
    }
  }
}