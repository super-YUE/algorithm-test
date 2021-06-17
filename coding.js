{
  function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
      return letter.toUpperCase();
    });
  }
  console.log(toHump('a_b2_345_c2345'))
}
{
  function toHump(name) {
    return name.replace(/\_(\w)/g, function(all, letter) {
      return letter.toLowerCase()
    })
  }
  function toLine(name) {
    return name.replace(/([A-Z])/g, "_$1").toLowerCase()
  }
  console.log(toLine("A123B123"))
}
{
  function Obj(xxx) {
    this.xxx = xxx
  }
  Obj.prototype = {
    constructor: Obj,
    getXXX: function() {
      console.log(this.xxx)
    }
  }
}
{
  class LRUCache {
    constructor(capacity) {
      this.cache = new Map()
      this.capacity = capacity
    }
    get(k) {
      if (!this.cache.has(k)) return -1
      const v = this.cache.get(k)
      this.cache.delete(k)
      this.cache.set(k, v)
      return v
    }
    put(k, v) {
       // delete if if it exists
      if (this.cache.has(k)) {
        this.cache.delete(k)
      }

      // store it in cache
      this.cache.set(k, v)

      // make sure not to exceed the range after store it in cache
      if (this.cache.size > this.capacity) {
        const first = this.cache.keys().next().value
        this.cache.delete(first)
      }
    }
  }
  const cache = new LRUCache(2)
  cache.put(1, 1);
  cache.put(2, 2);
  cache.get(1);       // 返回  1
  cache.put(3, 3);    // 该操作会使得密钥 2 作废
  cache.get(2);       // 返回 -1 (未找到)
  cache.put(4, 4);    // 该操作会使得密钥 1 作废
  cache.get(1);       // 返回 -1 (未找到)
  cache.get(3);       // 返回  3
  cache.get(4);       // 返回  4
}

{
  class LRUCache {
    constructor(capacity) {
      this.cache = new Map()
      this.capacity = capacity
    }

    get(key) {
      if(!this.cache.has(key)) return -1
      const v = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, v)
      return v
    }

    put(key, val) {
      if(this.cache.has(key)) {
        this.cache.delete(key)
      }
      this.cache.set(key, val)
      if (this.cache.size > this.capacity) {
        const first = this.cache.keys().next().value
        this.cache.delete(first)
      }
    }   
  }
}
{
  const arr = [2,3,4,1]
  arr.sort()
  console.log(arr)
}