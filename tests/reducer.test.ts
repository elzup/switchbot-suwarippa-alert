import { reducer } from './../src/reducer'

const detected = true
const notDetected = false
const min = 60 * 1000
const hm0000 = 947462400000
const hm0029 = hm0000 + 20 * min
const hm0031 = hm0000 + 30 * min

describe('logic', () => {
  test('change lastMoved with detected', () => {
    expect(reducer({ noticed: false, lastMoved: hm0000 }, detected, hm0029))
      .toMatchInlineSnapshot(`
Object {
  "doNotice": false,
  "state": Object {
    "lastMoved": 947463600000,
    "noticed": false,
  },
}
`)
  })

  test('suspended notice', () => {
    expect(reducer({ noticed: false, lastMoved: hm0000 }, notDetected, hm0031))
      .toMatchInlineSnapshot(`
Object {
  "doNotice": true,
  "state": Object {
    "lastMoved": 947462400000,
    "noticed": true,
  },
}
`)
  })

  test('suspended do not notice', () => {
    expect(reducer({ noticed: false, lastMoved: hm0000 }, notDetected, hm0029))
      .toMatchInlineSnapshot(`
Object {
  "doNotice": false,
  "state": Object {
    "lastMoved": 947462400000,
    "noticed": false,
  },
}
`)
  })

  test('suspended do not notice dups', () => {
    expect(reducer({ noticed: true, lastMoved: hm0000 }, notDetected, hm0031)).
toMatchInlineSnapshot(`
Object {
  "doNotice": false,
  "state": Object {
    "lastMoved": 947462400000,
    "noticed": true,
  },
}
`)
  })
})
