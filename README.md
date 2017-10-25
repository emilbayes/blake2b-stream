# `blake2b-stream`

[![Build Status](https://travis-ci.org/emilbayes/blake2b-stream.svg?branch=master)](https://travis-ci.org/emilbayes/blake2b-stream)

> Node Stream wrapper for Blake2b

## Usage

```js
var blakeb2Stream = require('blake2b-stream')

process.stdin.pipe(blake2bStream(function (err, hash) {
  if (err) throw err

  console.log('b2sum:', hash.toString('hex'))
}))
```

## API

### `var stream = blakeb2Stream([opts], cb(err, hash))`

Create a stream that calculates the Blake2b hash when `.end()`ed. `opts` include
`opts.outputLength` for the byte length of the hash and `opts.key` if you want
to partition your hash space with a custom key. `opts.key` must be buffer. The
allowed ranges for either argument can be referenced by the constants below.
When the source stream ends `cb` will be called with a `Buffer` of length
`opts.outputLenght` (which defaults to `blake2bStream.BYTES` / 32 bytes)

### Constants

- `blake2bStream.BYTES` Default hash length
- `blake2bStream.BYTES_MIN` Min hash length
- `blake2bStream.BYTES_MAX` Max hash length
- `blake2bStream.KEYBYTES` Recommended key length
- `blake2bStream.KEYBYTES_MIN` Min key length
- `blake2bStream.KEYBYTES_MAX` Max key length

## Install

```sh
npm install blake2b-stream
```

## License

[ISC](LICENSE)
