import { HrefObject } from './types'

function getQuery(href: string, as: string = null): {} {
  const query = {}

  if (as) {
    const hrefComponents = href.split('/')
    const asComponents = as.split('/')

    let i = 0
    hrefComponents.forEach((item) => {
      if (item.match(/^\[.*?]$/gm)) {
        query[item.substring(1, item.length - 1)] = asComponents[i]
      }

      i++
    })
  }

  return query
}

// eslint-disable-next-line import/prefer-default-export
export function getLinkHref(
  href: string | HrefObject,
  as: string = null
): HrefObject {
  let pathname: string
  let query = {}

  if (typeof href === 'object' && href !== null) {
    pathname = href.pathname
    if (href.query) {
      // eslint-disable-next-line prefer-destructuring
      query = href.query
    }

    if (as) {
      const queryAs = getQuery(pathname, as)
      query = { ...query, ...queryAs }
    }
  } else if (typeof href === 'string' && href) {
    pathname = href
    query = getQuery(href, as)
  }

  return {
    pathname,
    query,
  }
}
