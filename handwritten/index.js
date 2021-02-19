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

{
  function createObj(obj){
    function Car(){}
    Car.prototype = obj;
    return new Car();
  }
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
{
  Function.prototype.call = function(context) {
    if (typeof this != 'function') {
      throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(args)
    delete context.fn
    return result
  }
}

{
  Function.prototype.apply = function(context) {
    if (typeof this != 'function') {
      throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
      result = context.fn(...arguments)
    } else {
      result = context.fn()
    }
    delete context.fn
    return result
  }
}

{
  Function.prototype.bind = function(context) {
    if(typeof this !== 'function') {
      throw new TypeError('Error')
    }
    const _this = this
    const args = [...arguments].slice(1)
    return function F() {
      if (this instanceof F) {
        return new _this(...args, ...arguments)
      }
      return _this.apply(context, args.concat(...arguments))
    }
  }
}

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
    let prototype = right.prototype
    left = left.__proto__
    while (true) {
      if (left === null || left === undefined) {
        return false
      }
      if (prototype === left) {
        return true
      }
      left = left.__proto__
    }
  }
}