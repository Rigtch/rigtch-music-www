import { fetchArtists } from '.'

export async function fetchLastTracks() {
  const { lastTracks } = await GqlLastTracks()

  if (lastTracks.length === 0) throw new Error('no items')

  return await Promise.all(
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
        artists: await fetchArtists(artists),
        albumName: album.name,
        playedAt: playedAt ?? undefined,
        ...rest,
      })
    )
  )
}
