var sodium = require('sodium-universal')
var through = require('through2')
var assert = require('nanoassert')

create.BYTES = sodium.crypto_generichash_BYTES
create.BYTES_MIN = sodium.crypto_generichash_BYTES_MIN
create.BYTES_MAX = sodium.crypto_generichash_BYTES_MAX

create.KEYBYTES = sodium.crypto_generichash_KEYBYTES
create.KEYBYTES_MIN = sodium.crypto_generichash_KEYBYTES_MIN
create.KEYBYTES_MAX = sodium.crypto_generichash_KEYBYTES_MAX

function create (opts, cb) {
  if (typeof opts === 'function') return create(null, opts)
  if (opts == null) opts = {}
  if (opts.outputLength == null) opts.outputLength = create.BYTES

  assert(Number.isSafeInteger(opts.outputLength), 'opts.outputLength must be safe integer')
  assert(opts.outputLength >= create.BYTES_MIN, 'opts.outputLength must be at least BYTES_MIN (' + create.BYTES_MIN + ')')
  assert(opts.outputLength <= create.BYTES_MAX, 'opts.outputLength must be at most BYTES_MAX (' + create.BYTES_MAX + ')')
  assert(opts.key == null ? true : Buffer.isBuffer(opts.key), 'opts.key must be Buffer')
  assert(opts.key == null ? true : opts.key.length >= create.KEYBYTES_MIN, 'opts.key.length must be at least KEYBYTES_MIN (' + create.KEYBYTES_MIN + ')')
  assert(opts.key == null ? true : opts.key.length <= create.KEYBYTES_MAX, 'opts.key.length must be at most KEYBYTES_MAX (' + create.KEYBYTES_MAX + ')')
  assert(typeof cb === 'function', 'cb must be function')

  var output = Buffer.alloc(opts.outputLength)
  var hasher = sodium.crypto_generichash_instance(opts.key, opts.outputLength)

  return through(onchunk, onfinal)

  function onchunk (chunk, _, next) {
    hasher.update(chunk)
    return next()
  }
  function onfinal (done) {
    hasher.final(output)
    done()
    cb(null, output)
  }
}

module.exports = create
