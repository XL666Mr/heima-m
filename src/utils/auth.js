import storage from '@/utils/storage'
const TOKEN = 'userToken'
export const getToken = () => storage.get(TOKEN)
export const setToken = (val) => storage.set(TOKEN, val)
export const removeToken = () => storage.remove(TOKEN)
