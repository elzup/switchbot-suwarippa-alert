import got from 'got/dist/source'

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
  headers: {
    authorization: process.env.SWITCHBOT_TOKEN || '',
  },
  responseType: 'json',
})

export const getDevices = () => cli.get('devices').json<Response>()
export const getDevice = (deviceId: string) =>
  cli.get(`devices/${deviceId}/status`).json<DeviceLog>()
