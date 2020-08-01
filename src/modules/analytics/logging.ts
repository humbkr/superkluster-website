import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
  ReactPixel.pageView()
}

const logEvent = ({
  category,
  action,
  value,
  label,
  nonInteraction,
  transport,
}) => {
  ReactGA.event({
    category,
    action,
    value,
    label,
    nonInteraction,
    transport,
  })
}

const logException = (description: string = '', fatal: boolean = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}

export default {
  logPageView,
  logEvent,
  logException,
}
