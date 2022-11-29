import { defineStore } from 'pinia'

import { Artist, Track } from '~/types'
import { getArtists } from '~/utils'

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

        this.topTracks = await Promise.all(
          await topTracks.map(
            async ({
              album,
              artists,
              album: {
                images: [{ url: image }],
              },
              ...rest
            }) => ({
              image,
              artists: await getArtists(artists),
              albumName: album.name,
              ...rest,
            })
          )
        )
      } catch (error: any) {
        if (error.statusCode === 503) this.fetchTopTracks()
      }
    },
    async fetchLastTracks() {
      try {
        const { lastTracks } = await GqlLastTracks()

        this.lastTracks = await Promise.all(
          lastTracks.map(
            async ({
              album,
              artists,
              playedAt,
              album: {
                images: [{ url: image }],
              },
              ...rest
            }) => ({
              image,
              artists: await getArtists(artists),
              albumName: album.name,
              playedAt: playedAt ?? undefined,
              ...rest,
            })
          )
        )
      } catch (error: any) {
        if (error.statusCode === 503) this.fetchLastTracks()
      }
    },
  },
})
