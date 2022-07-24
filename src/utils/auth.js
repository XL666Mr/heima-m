import storage from '@/utils/storage'
const TOKEN = 'userToken'
const HistoryItem = 'SearchHistoryItem'
export const getToken = () => storage.get(TOKEN)
export const setToken = (val) => storage.set(TOKEN, val)
export const removeToken = () => storage.remove(TOKEN)

export const getHistoryItem = () => storage.get(HistoryItem)
export const setHistoryItem = (val) => storage.set(HistoryItem, val)
export const removeHistoryItem = () => storage.remove(HistoryItem)
