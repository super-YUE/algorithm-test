// vue3的初始化流程
const Vue = {
  createApp(options) {
    // 暴露给浏览器平台
    const render = Vue.createRender({
      querySelector(select) {
        return document.querySelector(select)
      },
      insert(children, parent, anchor) {
        parent.insertBefore(children, anchor || null)
      },
      createElement(tag) {
        return document.createElement(tag)
      }
    })
    return render.createApp(options)
  },
  createRender({ querySelector, insert }) {
    return {
      createApp(options) {
        return {
          mount(selector) {
            const parent = querySelector(selector)
            if(!options.render) {
              options.render = this.compile(parent.innerHTML)
            }
            if(options.setup) {
              this.setupState = options.setup()
            } else {
              this.data = options.data()
            }

            // Proxy
            // 确认render中数据从哪获取
            this.proxy = new Proxy(this, {
              get(target, key) {
                if (key in target.setupState) {
                  return target.setupState[key]
                } else {
                  return target.data[key]
                }
              },
              Set(target, key, val) {
                if (key in target.setupState) {
                  target.setupState[key] = val
                } else {
                  target.data[key] = val
                }
              }
            })

            this.update = function() {
              const vNode = options.render.call(this.proxy)
              if(!this.isMounted) {
                const el = this.createElm(vNode)
                parent.innerHTML = ""
                insert(el, parent)
                this.isMounted = true
              } else {
                this.patch(this._vnode,vNode)
              }
              this._vnode = vNode
            }

            // 初始化
            this.update()
          },
          compile(template) {
            return function render() {
              return h()
            }
          },
          creteElm(vNode) {
            // 创建根节点
            const el = createElement(vNode.tag)
            // props
            // children
            if (typeof vNode.children == "string") {
              el.textContent = vNode.children
            } else {
              vNode.children.forEach(child => {
                insert(this.creteElm(child), el)
              })
            }
            vNode.el = el
            return el
          }
        }
      }
    }
  }
}

const isObject = val => val !== null && typeof val === 'object'

function reactive(obj) {
  if (!isObject(obj)) {
    return obj
  }
  // Proxy相当于在对象外层加拦截
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      // Reflect用于执行对象默认操作，更规范、更友好
      // Proxy和Object的方法Reflect都有对应
      const res = Reflect.get(target, key, receiver)
      console.log(`获取${key}:${res}`)
      // 依赖收集
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver)
      console.log(`设置${key}:${value}`)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key)
      console.log(`删除${key}:${res}`)
      trigger(target, key)
      return res
    }
  })
  return observed
}

const effectStack = []

function effect(fn) {
  const rxEffect = function() {
    // 1.捕获异常
    try {
      // 2.入栈
      effectStack.push(rxEffect)
      // 3.触发依赖收集
      return fn()
    } finally {
      // 4.出栈
      effectStack.pop()
    }
  }

  rxEffect()

  return rxEffect
}

// 依赖收集，建立target，key和上面的effect函数之间映射关系
// 需要一个数据结构存储该关系
// {target: {key: [cb1, cb2, ...]}}
let targetMap = new WeakMap()
function track(target, key) {
  // 获取effect存入的函数
  const effect = effectStack[effectStack.length - 1]

  if (effect) {
    // 获取target对应Map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    // 获取depsMap中key和其值，也就是Set
    let deps = depsMap.get(key)
    if (!deps) {
      // 首次deps不存在，创建之
      deps = new Set()
      depsMap.set(key, deps)
    }

    // 将传入effect，添加到Set里面
    deps.add(effect)
    console.log(deps)
  }
}

function trigger(target, key) {
  // 获取映射关系
  const depsMap = targetMap.get(target)
  if (depsMap) {
    // 获取函数集合
    const deps = depsMap.get(key)
    deps.forEach(effect => {
      effect()
    })
  }
}

const state = reactive({
  foo: 'foo',
  bar: { a: 1 }
})

effect(() => {
  console.log('effect:', state.foo)
})

state.foo = 'fooooooo'
