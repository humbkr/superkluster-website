import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

jest.mock('next/config', () => () => ({ publicRuntimeConfig: {} }))
