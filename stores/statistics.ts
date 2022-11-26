import { defineStore } from 'pinia'

import { Artist, Track } from '~/types'

export interface StatisticsState {
  topArtists?: Artist[]
  topTracks?: Track[]
  lastTracks?: Track[]
}

export const useStatisticsStore = defineStore('statistics', {
  state: (): StatisticsState => ({
    topArtists: undefined,
    topTracks: undefined,
    lastTracks: undefined,
  }),
  actions: {
    async fetchTopArtists() {
      const { topArtists } = await GqlTopArtists()

      this.topArtists = topArtists.map(({ images, ...rest }) => ({
        ...rest,
        image: images[0]?.url,
      }))
    },
    async fetchTopTracks() {
      const { topTracks } = await GqlTopTracks()

      this.topTracks = topTracks.map(({ album, ...rest }) => ({
        ...rest,
        image: album.images[0]?.url,
      }))
    },
    async fetchLastTracks() {
      const { lastTracks } = await GqlLastTracks()

      this.lastTracks = lastTracks.map(({ album, ...rest }) => ({
        ...rest,
        image: album.images[0]?.url,
      }))
    },
  },
})
