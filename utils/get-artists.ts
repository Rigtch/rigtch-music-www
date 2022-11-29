export async function getArtists(artists: { id: string }[]) {
  return await Promise.all(
    artists.map(async ({ id }) => {
      const {
        artist: {
          images: [{ url: image }],
          ...rest
        },
      } = await GqlArtist({ id })

      return {
        image,
        ...rest,
      }
    })
  )
}
