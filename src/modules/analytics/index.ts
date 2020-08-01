import Analytics from './Analytics'

/**
 * This file should not contain any logic.
 * It's just meant to package everything from the duck folder so we can import pieces like that:
 * import { actions, operations } from './duck'
 * import { actions as anotherModuleActions } from '../anotherModule/duck'
 */

export { default as logging } from './logging'
export { default as tracking } from './tracking'
export { default as OutboundLink } from './OutboundLink'

export default Analytics
