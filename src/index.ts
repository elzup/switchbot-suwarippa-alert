import { postSlack } from './slack'
import { getDevice, getMoveDetected } from './switchbot'

const SUSPEND_DETECT_TIME = 30 * 60 * 1000

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

const isSuspend = (
  now: number,
  lastMoved: number,
  suspendDetectTime: number,
  detect: boolean
): boolean => {
  if (detect) return false
  const suspendTime = now - lastMoved

  return suspendTime >= suspendDetectTime
}

function notice(now: number) {
  postSlack()
  // sendSwarippa(now)
}

const check = getMoveDetected

type State = {
  lastMoved: number
  noticed: boolean
}
const initialState: State = {
  lastMoved: 0,
  noticed: false,
}

const reducer = (
  { noticed, lastMoved }: State,
  detected: boolean,
  now: number
): { state: State; doNotice: boolean } => {
  if (detected) {
    return { state: { lastMoved: +new Date(), noticed }, doNotice: false }
  }
  const suspend = isSuspend(now, lastMoved, SUSPEND_DETECT_TIME, detected)
  const doNotice = !noticed && suspend
  if (doNotice) {
    noticed = true
  }
  return { state: { noticed: doNotice || noticed, lastMoved }, doNotice }
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
