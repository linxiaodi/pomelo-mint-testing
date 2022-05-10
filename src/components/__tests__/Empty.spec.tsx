import { Empty } from '../Empty'
import React from 'react'
import { render, screen } from '@testing-library/react';

test('render without error', () => {
  render(<Empty/>)

  expect(screen.getByText(/no data/i)).toBeInTheDocument()
})
