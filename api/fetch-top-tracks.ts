import { fetchArtists } from '.'

export async function fetchTopTracks() {
  const { topTracks } = await GqlTopTracks()

  if (topTracks.length === 0) throw new Error('no items')

  return await Promise.all(
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
        artists: await fetchArtists(artists),
        albumName: album.name,
        ...rest,
      })
    )
  )
}
