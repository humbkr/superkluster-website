import React from 'react'
import NextLink, { LinkProps } from 'next/link'

interface Props extends LinkProps {
  onClick?: () => void
}

const Link: React.FC<Props> = ({
  href,
  as = null,
  passHref = true,
  onClick = null,
  children,
  ...props
}) => (
  <NextLink href={href} as={as} passHref={passHref}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
    <a {...props} onClick={onClick} data-testid="link">
      {children}
    </a>
  </NextLink>
)

export default Link
