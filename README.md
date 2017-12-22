# ci-cache
CafeInit simple cache for nodejs


## Install

```
npm install ci-cache --save
```

## Usage

```javascript
const CICache = require('CICache')

/**
 * @param ttl {Number} default 3600
 */
const cache = new CICache(30)
cache.onError = (err) => {
  console.warn(err)
}

/**
 * @param key {String}
 * @param value {Object}
 * @param ttl {Number} default cache.ttl
 */
cache.setItem('a', 100, 60)
console.log('a', cache.getItem('a'))
cache.setItem('b', 200)
console.log('b', cache.getItem('b'))

setTimeout(() => {
  console.log('a', cache.getItem('a'))
  console.log('b', cache.getItem('b'))
}, 35 * 1000)
```
