import { beforeEach, describe, expect, test, vi } from 'vitest'

import { useAuthStore } from './auth'

describe('Store - Auth', () => {
  const accessToken = 'accessToken'
  const refreshToken = 'refreshToken'
  const displayName = 'displayName'
  const href = 'href'
  const image = 'image'

  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    authStore = useAuthStore()
  })

  test('should be disconnected', () => {
    expect(authStore.isConnected).toBeFalsy()
    expect(authStore.accessToken).toBeUndefined()
    expect(authStore.refreshToken).toBeUndefined()
    expect(authStore.user).toBeUndefined()
  })

  test('should login', () => {
    vi.stubGlobal('useGqlToken', vi.fn())

    authStore.connect = vi.fn()

    authStore.login(accessToken, refreshToken)

    expect(authStore.connect).toHaveBeenCalled()
    expect(authStore.accessToken).toBe(accessToken)
    expect(authStore.refreshToken).toBe(refreshToken)
  })

  describe('connect', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'GqlProfile',
        vi.fn().mockResolvedValue({
          profile: {
            displayName,
            href,
            images: [{ url: image }],
          },
        })
      )
      authStore.refreshAccessToken = vi.fn()
    })

    test.skip('should connect', async () => {
      authStore.accessToken = accessToken

      expect(authStore.accessToken).toEqual(accessToken)
      await authStore.connect()

      expect(authStore.refreshAccessToken).toHaveBeenCalled()
      expect(authStore.isConnected).toBeTruthy()
      expect(authStore.user).toEqual({
        displayName,
        href,
        image,
      })
    })

    test('should not connect', async () => {
      authStore.accessToken = undefined

      await authStore.connect()

      expect(authStore.refreshAccessToken).not.toHaveBeenCalled()
      expect(authStore.isConnected).toBeFalsy()
      expect(authStore.user).toBeUndefined()
    })
  })

  test('should disconnect', () => {
    vi.stubGlobal('navigateTo', vi.fn())
    vi.stubGlobal('useGqlToken', vi.fn())

    authStore.accessToken = accessToken
    authStore.refreshToken = refreshToken
    authStore.isConnected = true
    authStore.user = {
      displayName,
      href,
      image,
    }

    authStore.disconnect()

    expect(authStore.accessToken).toBeUndefined()
    expect(authStore.refreshToken).toBeUndefined()
    expect(authStore.user).toBeUndefined()
    expect(authStore.isConnected).toBeFalsy()
  })

  describe('refreshAccessToken', () => {
    beforeEach(() => {
      vi.stubGlobal('useGqlToken', vi.fn())
    })

    test.skip('should refresh access token', async () => {
      vi.stubGlobal(
        'GqlRefresh',
        vi.fn().mockResolvedValue({
          refresh: {
            accessToken,
          },
        })
      )

      authStore.refreshToken = refreshToken

      await authStore.refreshAccessToken()

      expect(authStore.accessToken).toEqual(accessToken)
    })

    test('should not refresh access token', async () => {
      authStore.refreshToken = undefined

      await authStore.refreshAccessToken()

      expect(authStore.accessToken).toBeUndefined()
    })
  })
})
