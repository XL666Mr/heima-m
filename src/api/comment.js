import request from '@/utils/request'
export const setComment = (target, content) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/v1_0/comments',
    method: 'POST',
    data: { target, content }
  })
}
/**
 * 获取评论
 * @param {源id*} source
 * @returns
 */
export const getCommentList = (source) => {
  return request({
    url: '/v1_0/comments',
    params: { type: 'a', source }
  })
}
/**
 * 获取评论回复
 * @param {源id*} source
 * @returns
 */
export const getCommentReply = (source) => {
  return request({
    url: '/v1_0/comments',
    params: { type: 'c', source }
  })
}
/**
 *
 * @param {*评论id} target
 * @param {*评论内容} content
 * @param {*文章id} artId
 * @returns
 */
export const setCommentReply = (target, content, artId) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/v1_0/comments',
    method: 'POST',
    data: { target, content, art_id: artId }
  })
}
