import request from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannels = () => {
  return request({
    url: 'v1_0/user/channels'
  })
}
export const getAllChannels = () => {
  return request({
    url: 'v1_0/channels'
  })
}
export const delChannels = (target) => {
  return request({
    url: `v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
export const addChannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
const CHANNELS_TOKEN = 'CHANNELS'
export const getChannel = () => storage.get(CHANNELS_TOKEN)
export const setChannel = (val) => storage.set(CHANNELS_TOKEN, val)
export const removeChannel = () => storage.remove(CHANNELS_TOKEN)
