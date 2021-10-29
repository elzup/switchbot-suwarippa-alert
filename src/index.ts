import { getDevice } from './switchbot'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

async function main() {
  // const devices = await getDevices()

  while (true) {
    // console.log(devices.body.deviceList)
    const motionSensorId = 'F51BAA09E2E5'

    const log = await getDevice(motionSensorId)

    console.log(
      [+new Date(), log.body.moveDetected, log.body.brightness].join('\t')
    )
    await sleep(10 * 1000)
  }
}

main()
export default {}
