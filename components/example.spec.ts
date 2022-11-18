import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'

import Example from '~/components/example.vue'

describe('example', () => {
  test('should render', () => {
    render(Example)

    const component = screen.getByTestId('example')

    expect(component).toHaveTextContent('Hello World')
  })
})
