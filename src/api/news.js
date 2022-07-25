import request from '@/utils/request'
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

export const getArticleDetails = (id) => {
  return request({
    url: '/v1_0/articles/' + id
  })
}

// 收藏文章
export const setCollections = (target) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target }
  })
}
// 取消收藏文章
export const deleteCollections = (target) => {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
// 点赞文章
export const setlikings = (target) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target }
  })
}
// 取消点赞文章
export const deletelikings = (target) => {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
