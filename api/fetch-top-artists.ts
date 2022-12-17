export async function fetchTopArtists() {
  const topArtists = await GqlTopArtists().then(({ topArtists }) =>
    topArtists.map(({ images, ...rest }) => ({
      ...rest,
      image: images[0]?.url,
    }))
  )

  if (topArtists.length === 0) throw new Error('no items')

  return topArtists
}
