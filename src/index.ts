import { reducer, State } from './reducer'
import { postSlack } from './slack'
import { getMoveDetected } from './switchbot'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

function notice(now: number) {
  postSlack()
  // sendSwarippa(now)
}

const check = getMoveDetected

const initialState: State = {
  lastMoved: 0,
  noticed: false,
}

async function main() {
  let state = initialState

  while (true) {
    const detected = await check()
    const now = +new Date()
    const { state: newState, doNotice } = reducer(state, detected, now)
    if (doNotice) notice(now)
    state = newState

    await sleep(10 * 1000)
  }
}

main()
export default {}
