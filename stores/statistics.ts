import { defineStore } from 'pinia'

import { ExceptionCollection, ExceptionType, useExceptionStore } from '.'

import { Artist, Track } from '~/types'
import { fetchLastTracks, fetchTopArtists, fetchTopTracks } from '~/api'

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
        this.topArtists = await fetchTopArtists()
      } catch ({ statusCode, message }) {
        if (message === 'no items') {
          const exceptionsStore = useExceptionStore()

          exceptionsStore.addException(
            'You have no top artists',
            ExceptionType.Info,
            ExceptionCollection.TopArtists
          )
        }
        if (statusCode === 503) this.fetchTopArtists()
      }
    },
    async fetchTopTracks() {
      try {
        this.topTracks = await fetchTopTracks()
      } catch ({ statusCode, message }) {
        if (message === 'no items') {
          const exceptionsStore = useExceptionStore()

          exceptionsStore.addException(
            'You have no top tracks',
            ExceptionType.Info,
            ExceptionCollection.TopTracks
          )
        }

        if (statusCode === 503) this.fetchTopTracks()
      }
    },
    async fetchLastTracks() {
      try {
        this.lastTracks = await fetchLastTracks()
      } catch ({ statusCode, message }) {
        if (message === 'no items') {
          const exceptionsStore = useExceptionStore()

          exceptionsStore.addException(
            'You have no last tracks',
            ExceptionType.Info,
            ExceptionCollection.LastTracks
          )
        }

        if (statusCode === 503) this.fetchTopTracks()
      }
    },
  },
})
