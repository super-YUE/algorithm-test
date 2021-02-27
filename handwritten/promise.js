{
  class MyPromise {
    callbacks = [];
    state = 'pending'
    value = null
    constructor(fn) {
      fn(this._resolve.bind(this), this._reject.bind(this));
    }

    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        this._handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve,
          reject
        })
      })
    }

    catch(onError) {
      return this.then(null, onError)
    }

    finally(onDone) {
      if (typeof onDone == 'function') return this.then()
      let Promise = this.constructor;
      return this.then(
        value => Promise.resolve(onDone()).then(() => value),
        reason => Promise.resolve(onDone()).then(() => { throw reason }),
      )
    }

    _handle(callback) {
      if (this.state === 'pending') {
        this.callbacks.push(callback.onFulfilled);
        return
      }
      
      const cb = this.state === 'fulfilled' ? callback.onFulfilled : callback.onRejected

      if (!cb) {
        cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
        cb(this.value)
        return
      }

      let ret
      try {
        ret = cb(this.value)
        cb = this.state === 'fulfilled' ? callback.resolve : callback.reject
      } catch(error) {
        ret = error
        cb = callback.reject
      } finally {
        cb(ret)
      }
    }

    _resolve(value) {
      if (value && (typeof value === 'object' || typeof value === 'function')) {
        var then = value.then
        if (typeof then == 'function') {
          then.call(value, this._resolve.bind(this))
          return
        }
      }
      this.state = 'fulfilled'
      this.value = value
      this.callbacks.forEach(callback => this._handle(callback));
    }

    _reject(error) {
      this.state = 'rejected'
      this.value = error
      this.callbacks.forEach(callback => this._handle(callback))
    }

    static resolve(value) {
      if (value && value instanceof MyPromise) {
        return value
      } else if (value && typeof value === 'object' && typeof value.then === 'function') {
        let then = this.then
        return new MyPromise(resolve => {
          then(resolve)
        })
      } else if(value) {
        return new MyPromise(resolve => resolve(value))
      } else {
        return new MyPromise(resolve => resolve())
      }
    }

    static reject(value) {
      if (value && typeof value === 'object' && typeof value.then === 'function') {
        let then = value.then;
        return new Promise((resolve, reject) => {
          then(reject);
        });
      } else {
        return new Promise((resolve, reject) => reject(value));
      }
    }

    static all(promises) {
      return new MyPromise((resolve, reject) => {
        let fulfilledCount = 0
        const itemNum = promises.length
        const rets = Array.from({ length:itemNum })
        promises.forEach((promise, index) => {
          MyPromise.resolve(promise).then(result => {
            fulfilledCount++
            rets[index] = result
            if (fulfilledCount === itemNum) {
              resolve(rets)
            }
          }, reason => reject(reason))
        })
      })
    }

    static race(promises) {
      return new MyPromise((resolve, reject) => {
        for(let i = 0; i < promises.length; i++) {
          Promise.resolve(promises[i]).then((value) => {
            return resolve(value)
          }, (reason) => {
            return reject(reason)
          })
        }
      })
    }
  }

  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 1000)
  }).finally(() => {
    console.log('onDone')
  })
}