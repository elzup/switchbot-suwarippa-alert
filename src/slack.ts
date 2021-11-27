import { makeSlackParams } from '@elzup/kit/lib/slack'
import { getEnv } from '@elzup/kit/lib/getEnv'
import axios from 'axios'

const SLACK_URL = getEnv('SLACK_URL')

export function postSlack() {
  axios.request(
    makeSlackParams(SLACK_URL, {
      text: '動いて！',
      icon_emoji: ':chair:',
      username: '座りっぱ検知',
    })
  )
}
