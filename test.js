var test = require('tape')
var blake2bStream = require('.')

test('simple', function (assert) {
  var s = blake2bStream(function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('256c83b297114d201b30179f3f0ef0cace9783622da5974326b436178aeef610', 'hex'))
    assert.end()
  })

  s.write('hello')
  s.write(' ')
  s.write('world')
  s.end()
})

test('empty', function (assert) {
  var s = blake2bStream(function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8', 'hex'))
    assert.end()
  })

  s.end()
})

test('custom size', function (assert) {
  var s = blake2bStream({outputLength: 16}, function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('d978f12ed99540a7fd53d801d559faad', 'hex'))
    assert.end()
  })

  s.write('Ridder')
  s.write('-problemer')
  s.end()
})


test('custom size empty', function (assert) {
  var s = blake2bStream({outputLength: 16}, function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('cae66941d9efbd404e4d88758ea67670', 'hex'))
    assert.end()
  })

  s.end()
})

test('end', function (assert) {
  var s = blake2bStream(function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('324dcf027dd4a30a932c441f365a25e86b173defa4b8e58948253471b81b72cf', 'hex'))
    assert.end()
  })

  s.end('hello')
})

test('write end', function (assert) {
  var s = blake2bStream(function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('324dcf027dd4a30a932c441f365a25e86b173defa4b8e58948253471b81b72cf', 'hex'))
    assert.end()
  })

  s.write('hello')
  s.end()
})

test('long hash', function (assert) {
  var s = blake2bStream({outputLength: 64}, function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('e4cfa39a3d37be31c59609e807970799caa68a19bfaa15135f165085e01d41a65ba1e1b146aeb6bd0092b49eac214c103ccfa3a365954bbbe52f74a2b3620c94', 'hex'))
    assert.end()
  })

  s.write('hello')
  s.end()
})

test('long input', function (assert) {
  var s = blake2bStream(function (err, hash) {
    assert.error(err)
    assert.deepEqual(hash, Buffer.from('2f80d28ecdfb775f31f18d1cbe1b4a8f845b3ed33bc28a6341b3a62931110693', 'hex'))
    assert.end()
  })

  var data = new Array(128).fill('hej')

  data.forEach(function (d) {
    s.write(d)
  })

  s.end()
})
