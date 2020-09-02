import theme from './theme'

export interface PlaylistItem {
  title: string
  url: string
  // Audio format is required for urls not providing it, ex: /stream/123.
  format?: string
}

export enum RepeatState {
  'norepeat',
  'all',
  'one',
}

export type PlayerTheme = typeof theme
