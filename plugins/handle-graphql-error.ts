import { GraphqlError } from '~/types'

export default defineNuxtPlugin(() => {
  useGqlError((error: GraphqlError) => {
    const tokenExpired = error.statusCode === 401
    if (tokenExpired) GqlRefresh()
  })
})
