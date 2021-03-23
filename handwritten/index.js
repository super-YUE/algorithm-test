/** 创建对象 */

// 工厂模式

{
  function crateCar(color, passengers, brand) {
    const car = new Object()
    car.color = color;
    car.passengers = passengers
    car.brand = brand
    car.printBrand = function() {
      console.log(this.brand)
      return this.brand
    }
    return car
  }
  const car1 = crateCar('red', ['py'], 'bmw')
}
// 构造函数模式
{
  function Car(color, passengers, brand) {
    this.color = color
    this.passengers = passengers,
    this.brand = brand
    this.printBrand = function() {
      console.log(this.brand)
      return this.brand
    }
  }
  const car2 = new Car('red', ['py'], 'bmw')
}
{
  // 原型模式
  const Car = function() {}
  Car.prototype.color = 'red'
  Car.prototype.passengers = ['py']
  Car.prototype.brand = 'bmw'
  Car.prototype.printBrand = function() {
    return this.brand
  }
  const car3 = new Car();
}

// 组合构造模式

{
  function Car(color, brand) {
    this.color = color
    this.brand = brand
    this.passengers = []
  }
  
  Car.prototype = {
    constructor: Car,
    printBrand: function() {
      console.log(this.brand)
    }
  }
}

/** 继承 */
{
  function OldCar(){
    this.color = "red";
    this.passengers = ['a','b','c']
  }
  OldCar.prototype.getOldColor = function(){
    return this.color;
  }
  function NewCar(){
    this.color = "blue";
  }
  NewCar.prototype = new OldCar();

  var car = new NewCar();
  var car2 = new OldCar();
  // console.log(car.getOldColor()); //"blue"
  // console.log(car.passengers) // [ 'a', 'b', 'c' ]
  // console.log(car2.getOldColor()); //"red"
}

/** 继承 */
{
  function OldCar(name = 'default name'){
      this.passengers = ['a','b','c'];
      this.name = name 
  }
  function NewCar(name){
      OldCar.call(this, name);
      this.getColor = function() {
        console.log(this.name)
      }
  }
  const car = new OldCar()
  console.log(car.name)
  const newCar = new NewCar('car')
  console.log(newCar.name)
}

/** 组合继承 */
{
  function OldCar(brand) {
    this.brand = brand;
    this.passengers = ['a','b','c']
  }
  OldCar.prototype.getBrand = function() {
    return this.brand
  }
  function NewCar(name, color) {
    OldCar.call(this, name)  //第一次调用
    this.color = color;
  }
  NewCar.prototype = new OldCar(); //第二次调用
  NewCar.prototype.constructor = NewCar; //增强
  NewCar.prototype.getColor = function() {
    return this.color;
  }
  const car = new NewCar('brand', 'red')
  console.log(car.getColor())
}

/** 寄生组合继承 */ 
{
  function OldCar(brand) {
    this.brand = brand;
    this.passengers = ['a','b','c']
  }
  OldCar.prototype.getBrand = function() {
    return this.brand;
  }
  function NewCar(name,color){
    OldCar.call(this,name)
    this.color = color;
  }
  //继承开始
  var middleObj = Object.create(OldCar.prototype);
  middleObj.constructor = NewCar;
  NewCar.prototype = middleObj
  //继承结束
  NewCar.prototype.getColor = function(){
      return this.color;
  }
  const car = new NewCar('brand', 'black')
  console.log(car.getColor())
}

// create
{
  function createObj(obj) {
    function Obj(){}
    Obj.prototype = obj
    return new Obj()
  }
}

// call,bind,apply
// {
//   Function.prototype.call = function(context) {
//     if (typeof this != 'function') {
//       throw new TypeError('Error')
//     }
//     context = context || window
//     context.fn = this
//     const args = [...arguments].slice(1)
//     const result = context.fn(args)
//     delete context.fn
//     return result
//   }
// }

// {
//   Function.prototype.apply = function(context) {
//     if (typeof this != 'function') {
//       throw new TypeError('Error')
//     }
//     context = context || window
//     context.fn = this
//     let result
//     if (arguments[1]) {
//       result = context.fn(...arguments)
//     } else {
//       result = context.fn()
//     }
//     delete context.fn
//     return result
//   }
// }

// {
//   Function.prototype.bind = function(context) {
//     if(typeof this !== 'function') {
//       throw new TypeError('Error')
//     }
//     const _this = this
//     const args = [...arguments].slice(1)
//     return function F() {
//       if (this instanceof F) {
//         return new _this(...args, ...arguments)
//       }
//       return _this.apply(context, args.concat(...arguments))
//     }
//   }
// }

{
  function Create() {
    let obj = {} // 创建一个新对象
    let Con = [].shift.call(arguments) // 取出构造函数
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, arguments)
    return result instanceof Object ? result : obj
  }
}
{
  function myInstanceof(left, right) {
    // 获取类型的原型
    let prototype = right.prototype
    // 获取数据的原型
    let proto = left.__proto__
    while(true) {
      // 循环判断对象的原型是否等于类型的原型，直到对象原型为 null，因为原型链最终为 null
      if (left === null || prototype === undefined) {
        return false
      }
      if (proto == prototype) {
        return true
      }
      proto = proto.__proto__
    }
  }
}
{
  async function eachLimit(limit, arr, iteratorFn) {
    const res = []
    const activeList = []
    for (const item of arr) {
      const p = iteratorFn(item);
      res.push(p);
      const e = p.then(() =>
        activeList.splice(activeList.indexOf(e), 1)
      );
      activeList.push(p)
      while (activeList.length >= limit) {
        await Promise.race(activeList)
      }
    }
    return Promise.all(res);
  }

  async function test() {
    const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
    const result = await eachLimit(2, [100, 200, 300, 400, 500], timeout)
    console.log(result)
  }
  test()
}

{
  class Scheduler {
    constructor(limit) {
      this.limit = limit
      this.number = 0
      this.queue = []
    }

    addTask(timeOut, str) {
      this.queue.push([timeOut, str])
    }

    start() {
      if(this.number < this.limit && this.queue.length) {
        var [timeout, str] = this.queue.shift()
        this.number++
        setTimeout(() => {
          this.number--
          this.start()
        }, timeout * 1000);
        this.start()
      }
    }
  }
}

{
  function getType(data) {
    let type  = typeof data;
    if(type != "object") {
      return type
    }
    const typeString = Object.prototype.toString.call(data)
    return typeString.slice(8,-1)
  }
}

{
  Array.prototype.map = function(cb) {
    let newArr = []
    for(let i = 0; i < this.length; i++) {
      newArr.push(cb && cb(this[i]))
    }
    return newArr
  }
}