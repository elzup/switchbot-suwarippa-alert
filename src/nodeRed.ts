import { getEnv } from '@elzup/kit/lib/getEnv'
import got from 'got'

const url = getEnv('NODE_RED_URL')

export const sendSwarippa = (now: number) => got.post(url)
