import { makeSlackParams } from '@elzup/kit/dist/lib/slack'
import axios from 'axios'

const { SLACK_URL } = process.env

export function postSlack() {
  if (!SLACK_URL) {
    throw new Error('env not setup: SLACK_URL')
  }

  axios.request(
    makeSlackParams(SLACK_URL, {
      text: '動いて！',
      icon_emoji: ':chair:',
      username: '座りっぱ検知',
    })
  )
}
