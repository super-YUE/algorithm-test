// 防抖和节流
function debounce(fn, time) {
  let timer
  return function() {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, time);
  }
}

function throttle(fn, time) {
  let isRun = false
  return function() {
    if (isRun) return
    isRun = true
    setTimeout(() => {
      fn.apply(this, arguments)
      isRun = false
    }, time);
  }
}
// 工厂函数
{
  function createPerson(a, b) {
    const obj = new Object()
    obj.a = a
    obj.b = b
    return obj
  }
  function myNew(con) {
    const obj = {}
    Object.setPrototypeOf(obj, con.prototype)
    let result = con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }

  function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while(true) {
      if (left === null || left === undefined) return false
      if (prototype == left) return true
      left == left.__proto__
    }
  }

  function myNew() {
    const obj = {}
    const Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    const result = Con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }

  function createObj(obj) {
    function Obj() {}
    Obj.prototype = obj
    return new Obj()
  }
}

{
  function Person() {}
  Person.prototype.__proto__ === Object.prototype

  const Person1 = new Person()
  Person1.__proto__ = Person.prototype
  Person.prototype.constructor = Person
  Person1.__proto__.constructor = Person
  Person.prototype.isPrototypeOf(Person1) // true
}
// 原型链
{
  function SuperType() {}
  function SubType() {}
  SubType.prototype = new SuperType()
}
// 盗用构造函数
{
  function SuperType() {}
  function SubType(xxx) {
    SuperType.apply(this, xxx)
  }
  let instance1 = new SubType()
}
// 组合继承
{
  function SuperType() {}
  function SubType(xxx) {
    SuperType.apply(this, xxx) // 第二次调用父类构造函数
    this.yyy = "yyy"
  }
  SubType.prototype = new SuperType() // 第一次调用父类构造函数
  let instance1 = new SubType()
}
// 原型式继承
{
  function create(obj) {
    function Obj(){}
    Obj.prototype = obj
    return new Obj
  }
  function SuperType() {}
  const subType = create(SuperType)
}
// 寄生继承(拿到父类的构造函数)
{
  function SuperType(original) {
    let obj = create(original)
    obj.xxx = xxx
    return obj
  }
}
// 寄生组合继承
{
  function SuperType() {}
  function SubType() {
    SubType.apply(this)
  }
  inheritPrototype(SuperType, SubType)
  function inheritPrototype(SuperType, SubType){
    const prototype = Object.create(SuperType.prototype)
    prototype.constructor = SubType
    SubType.prototype = prototype
  }
}
{
  function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__
    while(true) {
      if (left === null || left === undefined) {
        return false
      }
      if (left == prototype) return true
      left = left.__proto__
    }
  }
}
{
  function myNew() {
    let obj = {}
    const Con = [].shift.call(this)
    obj.__proto__ = Con.prototype
    const result = Con.call(obj, arguments)
    return result instanceof Object ? result : obj 
  }
}
{
  function myCall(context) {
    context = context || window
    const args = [...arguments].slice(1)
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
  }

  function myApply(context) {
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

  function myBind(context) {
    const _this = this
    const args = [...arguments].slice(1)
    return function F(){
      if(this instanceof F) {
        return new _this(...args, ...arguments)
      }
      return _this.apply(context, args.concat(arguments))
    }
  }
}

{
  const checkType = (data, type = 1) => {
    const dataType = typeof data
    if(dataType == 'object') {
      return dataType
    }
    // function1
    if (type == 1) {
      const typeString = Object.prototype.toString.call(data)
      return typeString.slice(8,-1)
    } else {
      if (data.constructor == Array) {
        return 'Array'
      }
      if (data.constructor == Function) {
        return "Function"
      }
      if (data.constructor == Date) {
        return "Date"
      }
    }
  }
  checkType()
}
{
  function myCall(context) {
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(args)
    delete context.fn
    return result
  }
  function myApply(context) {
    context = context || window
    context.fn = this
    let result
    if(arguments[1]) {
      result = context.fn(...arguments[1])
    } else {
      result = context.fn()
    }
    return result
  }
  function myBind(context) {
    const _this = this
    const args = [...arguments].slice(1)
    return function F(){
      if(this instanceof F) {
        return new _this(...args, ...arguments)
      } else {
        return _this.apply(context, ...args.concat(arguments))
      }
    }
  }
}
{
  Array.prototype.flatten = function(arr) {
    return arr.reduce((a, b) => {
      return a,concat(Array.isArray(b) ? flatten(b) : b)
    }, [])
  }
  Array.prototype.flatten = function(arr) {
    return arr.toString().split(',').map(item => +item)
  }
  function flatten(arr) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result = result.concat(flatten(arr[i]))
      } else {
        result.push(arr[i])
      }
    }
  }
  function flattenObj(obj) {
    let result = {}
    let process = (key, value) => {
      if(Object(value) !== value) {
        if(key) {
          result[key] = value
        }
      } else if(Array.isArray(value)) {
        for(let i = 0; i < value.length; i++) {
          process(`${key}[${i}]`, value[i])
        }
        if (value.length === 0) {
          result[key] = [];
        }
      } else {
        let objArr = Object.keys(value);
        objArr.forEach(item => {
          process(key?`${key}.${item}`:`${item}`, value[item])
        });
        if (objArr.length === 0 && key) {
          result[key] = {};
        }
      }
    }
    process('', obj)
    return result;
  }
  function flattenObj(obj) {
    let result = {}
    let process = (key, value) => {
      if(Object(value) !== value) {
        if(key) {
          result[key] = value
        }
      } else if(Array.isArray(value)) {
        for(let i = 0; i < value.length; i++) {
          process(`${key}[${i}]`, value[i])
        }
        if (value.length === 0) {
          result[key] = [];
        }
      } else {
        let objArr = Object.keys(value)
        objArr.forEach(item => {
          process(key ? `${key}.${item}` : `${item}`, value[item])
        })
        if (objArr.length === 0 && key) {
          result[key] = {}
        }
      }
    }
    process('', obj)
    return result
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
    for(const v of arr) {
      results.push(add(() => fn(v)))
    }
    return await Promise.all(results)
  }
}
// 解决 0.1+0.2 !== 0.3的问题
{
  parseFloat(0.1 + 0.2).toFixed(10) === 0.3
}
{
  async function asyncLoop(arr, limit, fn) {
    const queues = new Array(limit).fill(0).map(() => Promise.resolve())
    let index = 0
    const add = (cb) => {
      index = (index + 1) % limit
      return queues[index] = queues[index].then(() => cb()) 
    }
    let results = []
    for (const item of arr) {
      results.push(add(() => fn(item)))
    }
    return await Promise.all(results)
  }
}
{
  function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
      if(!Array.isArray(arr)) {
        throw new TypeError('promises must be a Array')
      }
      let result = []
      let count = 0
      promises.forEach((promise, index) => {
        promise.then(res => {
          result[index] = res
          count++
          count === promises.length && resolve(result)
        }).catch((err) => {
          reject(err)
        })
      });
    })
  }

  function myPromiseRace(promises) {
    return new Promise((resolve, reject) => {
      if(!Array.isArray(arr)) {
        throw new TypeError('promises must be a Array')
      }
      promises.forEach(promise => {
        promise.then(res => {
          resolve(res)
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
  console.log(deepClone({
    a: 1,
    b: 3
  }))
}
{
  // 手写调度器
  class Scheduler {
    constructor(maxNum) {
      this.taskList = [];
      this.count = 0;
      this.maxNum = maxNum;
    }
    async add(promiseCreator) {
      if (this.count >= this.maxNum) {
        await new Promise((resolve) => {
          this.taskList.push(resolve)
        })
      }
      this.count ++;
      const result = await promiseCreator();
      this.count --;
      if (this.taskList.length > 0) {
        this.taskList.shift()();
      }
      return result;
    }
  }
  
  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })
  const scheduler = new Scheduler(2);
  const addTask = (time, val) => {
    scheduler.add(() => {
      return timeout(time).then(() => {
        console.log(val)
      })
    })
  }
  addTask(1000, 1);
  addTask(500, 2);
  addTask(300, 3);
  addTask(400, 4);
}