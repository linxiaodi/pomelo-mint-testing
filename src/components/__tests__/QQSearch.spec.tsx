import { QQSearch } from '../QQSearch'
import { render, screen, fireEvent } from '@testing-library/react';

test('component input trigger onchange', () => {
  const inputVal = '1234567'
  const handleChange = jest.fn()
  const { container } = render(<QQSearch onChange={handleChange}/>)
  const input = container.querySelector('input') as HTMLInputElement
  fireEvent.input(input, { target: { value: inputVal } })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(input.value).toBe(inputVal)
})

test('component input only accept number', () => {
  const inputVal = '1'
  const handleChange = jest.fn()
  const { container } = render(<QQSearch onChange={handleChange}/>)
  const input = container.querySelector('input') as HTMLInputElement
  fireEvent.input(input, { target: { value: inputVal } })
  fireEvent.input(input, { target: { value: `${inputVal}fd` } })
  expect(input.value).toBe(inputVal)
  expect(handleChange).toHaveBeenCalledTimes(1)
})

