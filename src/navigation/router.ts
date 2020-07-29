import NextRouter from 'next/router'
import { getLinkHref } from './utils'
import { HrefObject } from './types'

function push(url: string | HrefObject, as: string, options: {}) {
  // Make I18nLink work with dynamic urls,
  // @see https://github.com/isaachinman/next-i18next/issues/413
  const finalHref = getLinkHref(url, as)

  return NextRouter.push(finalHref, as, options).then(() => {
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
