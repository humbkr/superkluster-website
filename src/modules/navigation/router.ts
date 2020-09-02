/* istanbul ignore file */

import NextRouter from 'next/router'
import { UrlObject } from 'url'

declare type Url = string | UrlObject

/**
 * Extends Next.js router to scroll to the top when we push a new route to the user.
 */
function push(url: Url, as: string, options: {}) {
  return NextRouter.push(url, as, options).then(() => {
    if (window) {
      window.scrollTo(0, 0)
    }
  })
}

const Router = {
  ...NextRouter,
  push,
}

export default Router
