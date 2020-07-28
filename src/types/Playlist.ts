export interface PlaylistItem {
  title: string
  url: string
}

export interface Playlist {
  title: string
  items: PlaylistItem[]
}
