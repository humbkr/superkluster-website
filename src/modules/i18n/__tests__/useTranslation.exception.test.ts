// Note: it is apparently impossible to mock a module exporting an object more than once
// in a jest test file, so I had to create a separate file.
// @see https://github.com/facebook/jest/issues/2582

import { t } from '../useTranslation'

jest.mock('../strings', () => ({
  __esModule: true,
  default: undefined,
}))

describe('useTranslation', () => {
  it('does not crash when strings object has issues.', () => {
    expect(t('test.nope')).toBe('')
  })
})
