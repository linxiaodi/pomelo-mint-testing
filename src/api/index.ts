import { request } from "./request"
import { IQQInfo } from '../types'

export const getQQInfo = (data: { qq: string }) => {
  return request.get<null, IQQInfo>('https://api.uomg.com/api/qq.info', {
    params: data,
  })
}
