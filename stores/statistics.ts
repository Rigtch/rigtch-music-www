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
      try {
        const { topArtists } = await GqlTopArtists()

        this.topArtists = topArtists.map(({ images, ...rest }) => ({
          ...rest,
          image: images[0]?.url,
        }))
      } catch (error: any) {
        if (error.statusCode === 503) this.fetchTopArtists()
      }
    },
    async fetchTopTracks() {
      try {
        const { topTracks } = await GqlTopTracks()

        this.topTracks = topTracks.map(({ album, ...rest }) => ({
          ...rest,
          image: album.images[0]?.url,
        }))
      } catch (error: any) {
        if (error.statusCode === 503) this.fetchTopTracks()
      }
    },
    async fetchLastTracks() {
      try {
        const { lastTracks } = await GqlLastTracks()

        this.lastTracks = lastTracks.map(({ album, playedAt, ...rest }) => ({
          image: album.images[0]?.url,
          ...(!playedAt && { playedAt: undefined }),
          ...rest,
        }))
      } catch (error: any) {
        if (error.statusCode === 503) this.fetchLastTracks()
      }
    },
  },
})
