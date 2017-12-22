/**
 * @fileoverview CICache
 * @author burning <www.cafeinit.com>
 * @version 2017.12.22
 */

class CICache {
  constructor(ttl, maxCount) {
    this._ttl = (parseInt(ttl) || 3600) * 1000
    this._maxCount = parseInt(maxCount) || 200
    this._count = 0
    this._data = {}
    this._check()
  }

  _getNow() {
    return (new Date()).getTime()
  }

  _check() {
    setTimeout(() => {
      for (let key in this._data) {
        this.getItem(key)
      }

      this._check()
    }, 1000)
  }

  _error(message) {
    if (typeof this.onError == 'function') {
      this.onError(message)
    }
  }

  getItem(key) {
    let val = null
    let obj = this._data[key]

    if (obj) {
      if (this._getNow() <= obj.expires) {
        val = obj.val
      }
      else {
        this._count--
        delete this._data[key]
      }
    }

    return val
  }

  setItem(key, val, ttl) {
    if (!key) {
      this._error('key undefined')
      return
    }

    if (typeof val == 'undefined' || val === null) {
      this._error('value undefined')
      return
    }

    if (this._count >= this._maxCount) {
      this._error(`max count: ${this._maxCount}`)
      return
    }

    ttl = parseInt(ttl) * 1000 || this._ttl

    let item = this.getItem(key)
    if (item === null) {
      this._count++
    }

    this._data[key] = {
      key: key,
      val: val,
      expires: this._getNow() + ttl
    }
  }
}

module.exports = CICache
