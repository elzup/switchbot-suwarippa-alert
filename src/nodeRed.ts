import got from 'got'

const { NODE_RED_API_PATH } = process.env

if (!NODE_RED_API_PATH) throw Error('no setup NODE_RED_API_PATH')

export const sendSwarippa = (now: number) => got.post(NODE_RED_API_PATH)
