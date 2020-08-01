import React from 'react'
import ReactGA from 'react-ga'

const OutboundLink: React.FC<{
  to: string
  label: string
  target?: string
  rel?: string
  trackerNames?: string[]
}> = ({
  children, to, label, target, rel, trackerNames = [],
}) => (
  <ReactGA.OutboundLink
    eventLabel={label}
    to={to}
    target={target}
    rel={rel}
    trackerNames={trackerNames}
  >
    {children}
  </ReactGA.OutboundLink>
)

export default OutboundLink
