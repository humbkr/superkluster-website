import React, { forwardRef } from 'react'
import NextLink from 'next/link'
import { getLinkHref } from './utils'

// Forward Refs, it's useful.
const Link: React.FC<{
  href: string
  as?: string
  passHref?: boolean
  onClick?: () => void
}> = ({
  href,
  as = null,
  passHref = true,
  onClick = null,
  children,
  ...props
}, ref) => {
  // Make I18nLink work with dynamic urls,
  // @see https://github.com/isaachinman/next-i18next/issues/413
  const finalHref = getLinkHref(href, as)

  return (
    <NextLink href={finalHref} as={as} passHref={passHref}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <a {...props} ref={ref} onClick={onClick}>
        {children}
      </a>
    </NextLink>
  )
}

// @ts-ignore
export default forwardRef(Link)
