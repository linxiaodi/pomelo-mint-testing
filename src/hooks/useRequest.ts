import { useState } from 'react';

type UseRequestFn<T> = () => Promise<T>

interface UseRequestOptions {
  initialValue?: unknown
}

const noop = () => {}

class Delay {
  promise: Promise<unknown>
  resolve: (data: unknown) => unknown = noop
  reject: (data: unknown) => unknown = noop

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject
    })
  }

}

export function useRequest<T> (request: UseRequestFn<T>, options: UseRequestOptions) {
  const [data, setData] = useState(options.initialValue || undefined);
  const [loading, setLoading] = useState(false)
  const run = () => {
    return new Promise(async (resolve, reject) => {
      const data = await request()
    })
  }

  return {
  }
}

