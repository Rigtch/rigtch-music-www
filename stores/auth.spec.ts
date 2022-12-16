import { beforeEach, describe, expect, test, vi } from 'vitest'

import { useAuthStore } from './auth'

describe('Store - Auth', () => {
  const displayName = 'displayName'
  const href = 'href'
  const image = 'image'

  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    authStore = useAuthStore()
  })

  test('should be disconnected', () => {
    expect(authStore.isConnected).toBeFalsy()
    expect(authStore.user).toBeUndefined()
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
    })

    test.skip('should connect', async () => {
      await authStore.connect()

      expect(authStore.isConnected).toBeTruthy()
      expect(authStore.user).toEqual({
        displayName,
        href,
        image,
      })
    })
  })

  test('should disconnect', async () => {
    vi.stubGlobal('navigateTo', vi.fn())
    vi.stubGlobal('GqlLogout', vi.fn())

    authStore.isConnected = true
    authStore.user = {
      displayName,
      href,
      image,
    }

    await authStore.disconnect()

    expect(authStore.user).toBeUndefined()
    expect(authStore.isConnected).toBeFalsy()
  })
})
