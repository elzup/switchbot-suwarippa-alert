import { assert } from 'console'
import { makeSlackParams } from '@elzup/kit/dist/lib/slack'
import got from 'got'

const { SLACK_URL } = process.env

export function postSlack() {
  assert(SLACK_URL, 'env not setup: SLACK_URL')

  got(
    makeSlackParams(SLACK_URL, {
      text: '動いて！',
      channel: '#notice',
      icon_emoji: ':chair:',
      username: '座りっぱ検知',
    })
  )
}
