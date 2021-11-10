import { getDevice } from './switchbot'
import { sendSwarippa } from './nodeRed'

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
  sendSwarippa(now)
}

async function main() {
  // const devices = await getDevices()
  let lastMoved = 0
  let noticed = false
  const motionSensorId = 'F51BAA09E2E5'

  while (true) {
    const log = await getDevice(motionSensorId)
    const now = +new Date()

    if (log.body.moveDetected) {
      lastMoved = +new Date()
      noticed = false
    }
    if (
      !noticed &&
      isSuspend(now, lastMoved, SUSPEND_DETECT_TIME, log.body.moveDetected)
    ) {
      notice(now)
      noticed = true
    }
    await sleep(10 * 1000)
  }
}

main()
export default {}
