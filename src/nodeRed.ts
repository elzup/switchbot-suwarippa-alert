import got from 'got'

const cli = got.extend({
  prefixUrl: 'http://127.0.0.1:1880',
})

export const sendSwarippa = (now: number) => cli.post('suwarippa')
