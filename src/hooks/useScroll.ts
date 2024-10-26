import { useLayoutEffect, useState } from 'react'

const isBrowser = typeof window !== `undefined`

const getScrollPosition = () => {
  if (!isBrowser) return { x: 0, y: 0 }

  return { x: window.scrollX, y: window.scrollY }
}

export const useScrollPosition = (wait: number, dependencies: any[] = []) => {
  const [position, setPosition] = useState(getScrollPosition())

  let throttleTimeout: NodeJS.Timeout | null = null

  const callBack = () => {
    setPosition(getScrollPosition())
    throttleTimeout = null
  }

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, dependencies)

  return position
}
