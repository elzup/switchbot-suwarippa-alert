import assert from 'assert'
import got from 'got'

const { NODE_RED_API_PATH } = process.env

assert(NODE_RED_API_PATH, 'env not setup: SWITCHBOT_TOKEN')

export const sendSwarippa = (now: number) => got.post(NODE_RED_API_PATH)
