import { Artist } from './artist'

export interface Track {
  name: string
  artists: Artist[]
  image: string
  albumName: string
  href: string
  playedAt?: string
}
