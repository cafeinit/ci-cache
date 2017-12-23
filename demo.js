/**
 * @fileoverview demo
 * @author burning <www.cafeinit.com>
 * @version 2017.12.22
 */

const CICache = require('./index')

/**
* @param ttl {Number} default 3600
*/
const cache = new CICache(3, 1)
cache.isDebug = true
cache.onError = (err) => {
 console.warn(err)
}

/**
* @param key {String}
* @param value {Object}
* @param ttl {Number} default cache.ttl
*/
cache.setItem('a', 100, 5)
console.log('a', cache.getItem('a'))
cache.setItem('b', 200)
console.log('b', cache.getItem('b'))

setTimeout(() => {
  console.log('a', cache.getItem('a'))

  cache.setItem('b', 200)
  console.log('b', cache.getItem('b'))
}, 6 * 1000)
