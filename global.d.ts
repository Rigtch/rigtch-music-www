import 'vitest'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare global {
  namespace Vi {
    // after chancing interface to type error apears again.
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Assertion<T = uknown> extends TestingLibraryMatchers<T, void> {}
  }
}
