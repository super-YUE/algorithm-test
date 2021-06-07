{
  function defineReactive(obj, key, val) {
    Observe(val)

    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if(val !== newVal) {
          observe(newVal)
          val = newVal
          dep.notify()
        }
      }
    })
  }

  // proxy代理函数：让用户可以直接访问data中的key
  function proxy(vm, key) {
    Object.keys(vm[key]).forEach(k => {
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

  function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    new Observer(obj)
  }

  class Observer {
    constructor(value) {
      this.value = value
  
      // 判断一下value类型
      // 遍历对象
      this.walk(value)
    }
  
    walk(obj) {
      Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
      })
    }
  }

  class myVue {
    constructor(options) {
      // 0.保存options
      this.$options = options
      this.$data = options.data

      // 1.将data做响应式处理
      observe(this.$data)

      // 2.为$data做代理
      proxy(this, '$data')

      // 3.编译模板
      new Compile('#app', this)
    }
  }

  class Compile {

    constructor(el, vm) {
      this.$el = document.querySelector(el)
      this.$vm = vm
  
      // 解析模板
      if (this.$el) {
        // 编译
        this.compile(this.$el)
      }
    }

    compile(el) {
      el.childNodes.forEach(node => {
        if (node.type == 1) {
          this.compileElement(node)
        } else if (this.isInter(node)) {
          this.compileText(node)
        }
        // 递归
        if (node.childNodes && node.childNodes.length > 0) {
          this.compile(node)
        }
      })
    }

    // 判断插值表达式
    isInter(node) {
      return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 编译文本
    compileText(node) {
      this.update(node, RegExp.$1, 'text')
    }

    // 编译元素：分析指令、@事件
    compileElement(node) {
      // 获取属性并遍历之
      const nodeAttrs = node.attributes

      Array.from(nodeAttrs).forEach(attr => {
        // 指令：k-xxx="yyy"
        const attrName = attr.name  // k-xxx
        const exp = attr.value // yyy
        if (this.isDirective(attrName)) {
          const dir = attrName.substring(2) // xxx
          // 指令实际操作方法
          this[dir] && this[dir](node, exp)
        }
        // 处理事件
      })
    }

    isDirective(attr) {
      return attr.indexOf('k-') === 0
    }

    // 执行text指令对应的更新函数
    text(node, exp) {
      this.update(node, exp, 'text')
    }

    // k-text对应操作函数
    textUpdater(node, val) {
      node.textContent = val
    }

    html(node, exp) {
      this.update(node, exp, 'html')
    }

    htmlUpdater(node, val) {
      node.innerHTML = val
    }

    update(node, exp, dir) {
      const fn = this[dir + 'Updater']
      // 初始化
      fn && fn(node, this.$vm[exp])

      // 更新
      new Watcher(this.$vm, exp, function (val) {
        fn && fn(node, val)
      })
    }

  }

  class Watcher {
    constructor() {
      this.vm = vm
      this.key = key
      this.updaterFn = updaterFn

      // 依赖收集触发
      Dep.target = this
      this.vm[this.key] // 触发上面的get
      Dep.target = null
    }

    update() {
      this.updaterFn.call(this.vm, this.vm[this.key])
    }
  }

  class Dep {
    constructor() {
      this.deps = []
    }

    addDep(watcher) {
      this.deps.push(watcher)
    }

    notify() {
      this.deps.forEach(watcher => watcher.update())
    }
  }
}
{
  function sumFn(n) {
    if(n == 1) return 
    return n * sumFn(n-1)
  }
}