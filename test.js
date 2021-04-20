{
  function getType(data, type = 1) {
    let dataType = typeof data
    if (dataType !== 'object') {
      return dataType
    }
    if (type == 1) {
      const stringType = Object.prototype.toString.call(data)
      return stringType.slice(8, -1)
    } else {
      if (data.constructor == Array) {
        return 'Array'
      }
      if (data.constructor == Object) {
        return 'Object'
      }
      if (data.constructor == Date) {
        return 'Date'
      }
    }
  }
}
{
  async function asyncLoop(arr, limit, fn) {
    const queues = new Array(limit).fill(0).map(() => Promise.resolve())
    let index = 0
    const add = cb => {
      index = (index + 1) % limit
      return queues[index] = queues[index].then(() => cb())
    }
    let results = []
    for(let item of arr) {
      results.push(add(() => fn(item)))
    }
    return await Promise.all(results)
  }
}
{
  function myInstanceof(left, right) {
    const prototype = right.prototype
    left = left.__proto__
    while(true) {
      if(left === null || prototype == undefined) return false
      if(left === prototype) return true
      left = left.__proto__
    }
  }
}
{
  function myCall(context) {
    context = window || context
    const args = [...arguments].slice(1)
    context.fn = this
    const result = context.fn(args)
    delete context.fn
    return result
  }

  function myApply(context) {
    context = window || context
    context.fn = this
    let result
    if(arguments[1]) {
      result = context.fn(arguments[1])
    } else {
      result = context.fn()
    }
    delete context.fn
    return result
  }

  function myBind(context) {
    let _this = this
    const args = [...arguments].slice(1)
    return function F() {
      if(this instanceof F) {
        return new _this(...args, ...arguments)
      } else {
        return _this.apply(context, ...args.concat(arguments))
      }
    }
  }
}
{
  function flatten(arr) {
    return arr.reduce((a, b) => {
      return a.c(Array.isArray(b) ? flatten(b) : b)
    }, [])
  }
  function flatten(arr) {
    return arr.toString().split(',').map(item => +item)
  }
  function flatten(arr) {
    let result = []
    for(let i = 0; i < arr.length; i++) {
      if(Array.isArray(arr[i])) {
        result = result.concat(flatten(arr[i]))
      } else {
        result.push(arr[i])
      }
    }
    return result
  }
}
{
  parseFloat(0.1 + 0.2).toFixed(10)
}
{
  function superType() {}
  function subType() {
    superType.call()
  }

  function inheritPrototype(subType, superType) {
    const prototype = Object.create(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
  }

  // 组合继承
  function superType() {}
  function subType() {
    superType.call()
    this.xxx = xxx
  }
  subType.prototype = new superType()
}

{
  function myNew() {
    const obj = {}
    const Con = [].shift.call(this)
    obj.__proto__ = Con
    const result = Con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }
  function myCreate(obj) {
    function F() {}
    F.prototype = obj
    return new F()
  }
}
{
  function debounce(fn, time) {
    let timer
    return function() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.call(this, arguments)
      }, time);
    }
  }
  function throttle(fn, time) {
    let isRun = false
    return function() {
      if(isRun) return
      isRun = true
      setTimeout(() => {
        fn.call(this, arguments)
        isRun = false
      }, time);
    }
  }
}
{
  function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      let result = []
      promises.forEach(promise => {
        promise.then((res) => {
          count++
          result.push(res)
          count == promises.length && resolve(results)
        }).catch(err => {
          reject(err)
        })
      });
    })
  }
}
{
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2');
  }
  console.log('script start');
  setTimeout(function() {
    console.log('setTimeout');
  }, 0)
  async1();
  new Promise(function(resolve) {
    console.log('promise1');
    resolve();
  })
  .then(function() {
    console.log('promise1 then');
    return 'promise1 end';
  })
  .then((res) => {
    console.log(res);
  })
  .then((res) => {
    console.log(res);
  });
  console.log('script end');
}
