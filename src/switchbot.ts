import { assert } from 'console'
import got from 'got'

const authorization = process.env.SWITCHBOT_TOKEN
assert(authorization, 'env not setup: SWITCHBOT_TOKEN')

export type MotionDeviceLog = {
  statusCode: string
  body: {
    deviceId: string
    deviceType: 'Motion Sensor'
    hubDeviceId: string
    moveDetected: boolean
    brightness: 'bright'
  }
  message: 'scucess'
}
export type DeviceLog = MotionDeviceLog
export type Response = { body: { deviceList: unknown[] } }

const cli = got.extend({
  prefixUrl: 'https://api.switch-bot.com/v1.0',
  headers: { authorization },
  responseType: 'json',
})

export const getDevices = () => cli.get('devices').json<Response>()
export const getDevice = (deviceId: string) =>
  cli.get(`devices/${deviceId}/status`).json<DeviceLog>()
