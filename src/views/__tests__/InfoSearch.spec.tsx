import { InfoSearch } from '../InfoSearch'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IQQInfo } from '../../types';

const SUCCESS_RESPONSE: IQQInfo = {
  code: 1,
  lvzuan: {
    code: 123,
    isyear: 5
  },
  name: 'test',
  qlogo: '//',
  qq: '123'
}

const FAIL_RESPONSE = {
  code: 201702,
  msg: 'valid qq'
}

jest.mock('../../api/index', () => {
  return {
    getQQInfo: (data) => {
      const { qq } = data;
      // valid qq
      const qqReg=/^[1-9]\d{4,10}$/;
      if (qqReg.test(qq)) {
        return new Promise((resolve) => {
          setTimeout(resolve, 100, {
            ...SUCCESS_RESPONSE,
            qq,
          })
        })
      }
      return Promise.reject(new Error(FAIL_RESPONSE.msg))
    }
  }
})

test('component input invalid qq will show error status', async () => {
  // mock api
  const { container } = render(<InfoSearch/>)
  const input = container.querySelector('input') as HTMLInputElement
  fireEvent.input(input, { target: { value: '123' } })
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  // wait until response
  await waitFor(() => new Promise((r) => setTimeout(r, 100, 0)))
  expect(screen.getByText('has no data')).toBeInTheDocument();
})

test('component input correct qq', async () => {
  const { container } = render(<InfoSearch/>)
  const input = container.querySelector('input') as HTMLInputElement
  fireEvent.input(input, { target: { value: '123456' } }) // correct qq
  // has loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => new Promise((r) => setTimeout(r, 200, 0)))
  expect(screen.getByText(/123456/)).toBeInTheDocument();
})

test('concurrency input change and take latest response', async () => {
  const { container } = render(<InfoSearch/>)
  const input = container.querySelector('input') as HTMLInputElement
  const v1 = '123456'
  const v2 = '1234578'
  const v3 = '1234579'

  fireEvent.input(input, { target: { value: v1 } })
  await Promise.resolve();
  fireEvent.input(input, { target: { value: v2 } })
  await waitFor(() => new Promise((r) => setTimeout(r, 50, 0)))
  fireEvent.input(input, { target: { value: v3 } })
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => new Promise((r) => setTimeout(r, 200, 0)))
  expect(screen.getByText(new RegExp(v3))).toBeInTheDocument();
})
