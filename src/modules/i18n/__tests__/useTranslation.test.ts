import { t } from '../useTranslation'

jest.mock('../strings', () => ({
  __esModule: true,
  default: {
    fr: {
      test: {
        text: 'This is a test',
      },
    },
  },
}))

describe('useTranslation', () => {
  beforeEach(() => jest.clearAllMocks())

  it('gets translation when one is found', () => {
    expect(t('test.text')).toBe('This is a test')
  })

  it('does not crash when no translation is found', () => {
    expect(t('test.nope')).toBe('')
  })
})
