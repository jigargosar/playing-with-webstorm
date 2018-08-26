import { findIndexById } from './ramda-ext'
import { toPairs } from 'ramda'

describe('findIndexById', function() {
  it('should find matching element', function() {
    const id1Element = { id: 'id1' }
    const idx = findIndexById('id1')([id1Element])
    expect(idx).toBe(0)
  })
})

describe('arrayToPairs', function() {
  it('should convert array to index,obj pair', function() {
    const indexPairs = toPairs(['a', 'b'])
    expect(indexPairs).toEqual([['0', 'a'], ['1', 'b']])
  })
})
