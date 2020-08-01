import gdpr from './gdpr'

/**
 * This file should not contain any logic.
 * It's just meant to package everything from the duck folder so we can import pieces like that:
 * import { actions, operations } from './duck'
 * import { actions as anotherModuleActions } from '../anotherModule/duck'
 */

export { default as CookiesBanner } from './CookiesBanner'

export default gdpr
