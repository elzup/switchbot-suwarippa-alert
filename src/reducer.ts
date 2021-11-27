const SUSPEND_DETECT_TIME = 30 * 60 * 1000

export type State = {
  lastMoved: number
  noticed: boolean
}

const isSuspend = (
  now: number,
  lastMoved: number,
  suspendDetectTime: number,
  detect: boolean
): boolean => {
  if (detect) return false
  const suspendTime = now - lastMoved

  return suspendTime >= suspendDetectTime
}

// if not detected some time (SUSPEND_DETECT_TIME), once do notice
export const reducer = (
  { noticed, lastMoved }: State,
  detected: boolean,
  now: number
): { state: State; doNotice: boolean } => {
  if (detected) {
    return { state: { lastMoved: now, noticed }, doNotice: false }
  }
  const suspend = isSuspend(now, lastMoved, SUSPEND_DETECT_TIME, detected)
  const doNotice = !noticed && suspend
  if (doNotice) {
    noticed = true
  }
  return { state: { noticed: doNotice || noticed, lastMoved }, doNotice }
}
