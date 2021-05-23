var name = 'window'
function Person(name) {
    this.name = name
    this.obj = {
      name: 'obj',
      foo1: function () {
        return function () {
          console.log(this.name)
        }
      },
      foo2: function () {
        return () => {
          console.log(this)
          console.log(this.name)
        }
      }
    }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

// person1.obj.foo1()()
// person1.obj.foo1.call(person2)()
// person1.obj.foo1().call(person2)

// person1.obj.foo2()()
// person1.obj.foo2.call(person2)()
// person1.obj.foo2().call(person2)

this.myName = "小李"
function myFun() {
  this.myName = '小黄'
  return {
    myName: '小红',
    callFunction: function() {
      setTimeout(() => {
        console.log(this.myName)
      }, 2000);
      return this.myName
    }
  }
}
// console.log(myFun().callFunction())
const a = myFun()
console.log(a.callFunction())