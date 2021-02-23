class Promise {
  /**
   * 终值
   * @type {*}
   */
  val = null;
  /**
   * 据因
   * @type {string}
   */
  reason;
  /**
   * 状态
   * @type {"pending"|"fulfilled"|"rejected"}
   */
  state = "pending";
  onFulfilledCallback = [];
  onRejectedCallback = [];

  constructor(executor) {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    try {
      executor(this.resolve, this.reject);
    } catch {
      this.reject()
    }
  }

  static resolve(value) {
    if(value instanceof Promise) return value;
    return Promise(function(resolve, reject) {
      if (value && value.then && typeof then === 'function') {
        setTimeout(function() {
          value.then(resolve, reject);
        });
      } else {
        reject(value);
      }
    })
  }

  static reject(reason) {
    return new Promise(function(resolve, reject) {
      if (reason && reason.then && typeof then === 'function') {
        setTimeout(function() {
          reason.then(resolve, reject);
        })
      } else {
        reject(reason);
      }
    })
  }

  static all(promises) {
    if (!promises || typeof Promise[Symbol.iterator] !== "function") {
      throw TypeError(
        `${typeof promises} is not iterable (cannot read property Symbol(Symbol.iterator))`
      );
    }
    let index = 0;
    const result = [];
    return new Promise(function(resolve, reject) {
      if (!promises.length) {
        resolve(promises);
      } else {
        function processValue(value, i) {
          result[i] = value;
          if (++index === promises.length) {
            resolve(result)
          }
        }
        
        for (let i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i]).then(
            function (value) {
              processValue(value, i)
            },
            function (reason) {
              reject(reason)
            }
          )
        }
      }
    })
  }

  static race(promises) {
    if (!promises || typeof Promise[Symbol.iterator] !== "function") {
      throw TypeError(
        `${typeof promises} is not iterable`
      )
    }
    return new Promise(function (resolve, reject) {
      if (!promises.length) {
        resolve()
        return
      }
      for (const promise of promises) {
        Promise.resolve(promise).then(
          function (value) {
            resolve(value)
          },
          function (reason) {
            reject(reason)
          }
        )
      }
    })
  }

  resolve(value) {
    if (this.state == 'pending') {
      this.state = "fulfilled"
      this.value = value
      this.onFulfilledCallback.forEach((fn) => {
        fn(this.value)
      })
    }
  }

  reject(reason) {
    if (this.state == 'pending') {
      this.state = 'rejected'
      this.reason = reason

      this.onRejectedCallback.forEach((fn) => {
        fn(this.reason)
      })
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = 
      typeof onFulfilled == 'function' 
        ? onFulfilled
        : function(reason) {
          throw reason
        }
    onRejected = 
      typeof onRejected == 'function'
        ? onRejected
        : function(reason) {
          throw reason
        }
    return Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        try {
          const result = onFulfilled(this.value)
          resolvePromise(result, resolve, reject)
        } catch(e) {
          reject(e)
        }
      }

      if (this.state == 'rejected') {
        try {
          const result = onRejected(this.value)
          resolvePromise(result, resolve, reject)
        } catch(e) {
          reject(e)
        }
      }

      if (this.state == 'pending') {
        this.onFulfilledCallback.push((value) => {
          try {
            const result = onFulfilled(value);
            resolvePromise(result, resolve, reject);
          } catch(e) {
            reject(e)
          }
        })
        this.onRejectedCallback.push((value) => {
          try {
            const result = onRejected(reason);
            resolvePromise(result, resolve, reject);
          } catch(e) {
            reject(e)
          }
        })
      }

      function resolvePromise(promise, resolve, reject) {
        if (promise instanceof Promise) {
          promise.then(resolve, reject)
        } else {
          resolve(promise)
        }
      }
    })
  }

  finally(callback) {
    return this.then(
      () => Promise.resolve(callback()),
      () => Promise.reject(callback())
    )
  } 
}
