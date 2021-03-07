{
  // 数据响应式
  function defineReactive(obj, key, val) {
    observe(obj)

    Object.defineProperty(obj, key, {
      get() {
        console.log('get', val)
        return val
      },
      set(newVal) {
        console.log('set', newVal)
        if (val !== newVal) {
          observe(obj)
          val = newVal
        }
      }
    })
  }
  function observe(obj){
    if(typeof obj !== 'object' || obj !== null) {
      return obj
    }
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
  const obj = {}
  defineReactive(obj, 'foo', 'foo')
  obj.foo
  obj.foo = 'foooo'
}

{
  // vue核心代码
  function defineReactive(obj, key, val) {
    observe(obj)

    Object.defineProperty(obj, key, {
      get() {
        console.log('get', val)
        return val
      },
      set(newVal) {
        console.log('set', newVal)
        if (val !== newVal) {
          observe(obj)
          val = newVal
        }
      }
    })
  }
  function observe(obj){
    if(typeof obj !== 'object' || obj !== null) {
      return obj
    }
    new Observe(obj)
  }
  
  class Observe {
    constructor(val) {
      this.val = val
      this.walk()
    }

    walk(obj) {
      Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
      })
    }
  }

  class PyVue  {
    constructor(options) {
      this.$options = options
      this.$data = options.data

      // 每遇到一个对象
      observe(this.$data)

      proxy(this, "$data")
      
      new Compile('#app', this)
    }
  }

  function proxy(vm, key) {
    Object.keys(obj).forEach(k => {
      Object.defineProperty(vm, k, {
        get() {
          return vm[key][k]
        },
        set(v) {
          vm[key][k] = v
        }
      })
    })
  }

}
{
  function reactive(obj) {
    if (!isObj(obj)) {
      return obj
    }

    const observed = new Proxy(obj, {
      get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        onsole.log(`获取${key}:${res}`)
        return isObject(res) ? reactive(res) : res
      },
      set(target, key, value, receiver) {
        const res = Reflect.set(target, key, value, receiver)
        return res
      },
      deleteProperty(target, key) {
        const res = Reflect.deleteProperty(target, key)
        trigger(target, key)
        return res
      }
    })
    return observed
  }
}