import { findIndexById } from './ramda-ext'

describe('findIndexById', function() {
  it('should find matching element', function() {
    const id1Element = { id: 'id1' }
    const idx = findIndexById('id1')([id1Element])
    expect(idx).toBe(0)
  })
})
