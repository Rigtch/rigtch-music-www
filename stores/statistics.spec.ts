import { beforeEach, describe, expect, test, vi } from 'vitest'

import { useStatisticsStore } from './statistics'

import { Artist } from '~/types'

const artistMock = {
  name: 'artist',
  genres: ['genre'],
  images: [{ url: 'image' }],
  href: 'href',
}

const formattedArtistMock: Artist = {
  name: 'artist',
  genres: ['genre'],
  image: 'image',
  href: 'href',
}

const trackMockFactory = (isFormatted = false, isLastTrack = false) => ({
  name: 'track',
  href: 'href',
  ...(isFormatted
    ? { albumName: 'album' }
    : {
        album: {
          name: 'album',
          images: [{ url: 'image' }],
        },
      }),
  ...(isFormatted
    ? {
        artists: [artistMock],
      }
    : {
        artists: [
          {
            id: 'id',
          },
        ],
      }),
  ...(isLastTrack && { playedAt: 'playedAt' }),
})

describe('Store - Statistics', () => {
  let statisticsStore: ReturnType<typeof useStatisticsStore>

  beforeEach(() => {
    statisticsStore = useStatisticsStore()
  })

  test('state values should be undefined', () => {
    expect(statisticsStore.topArtists).toEqual(undefined)
    expect(statisticsStore.topTracks).toEqual(undefined)
    expect(statisticsStore.lastTracks).toEqual(undefined)
  })

  test('should fetch top artists', async () => {
    vi.stubGlobal(
      'GqlTopArtists',
      vi.fn().mockResolvedValue({ topArtists: [artistMock] })
    )

    await statisticsStore.fetchTopArtists()

    expect(statisticsStore.topArtists).toEqual([formattedArtistMock])
  })

  /* 
    `topTracks` is undefined after calling `fetchTopTracks()`
    `GqlTopTracks()` is mocked to return a valid response
  */
  test.skip('should fetch top tracks', async () => {
    vi.mock(
      '~/utils/getArtists',
      vi.fn().mockResolvedValue([
        {
          name: 'artist',
          genres: ['genre'],
          image: 'image',
          href: 'href',
        },
      ])
    )

    vi.stubGlobal(
      'GqlTopTracks',
      vi.fn().mockResolvedValue({
        topTracks: [trackMockFactory()],
      })
    )

    await statisticsStore.fetchTopTracks()

    expect(statisticsStore.topTracks).toEqual([trackMockFactory(true)])
  })

  test.todo('should fetch last tracks')
})
