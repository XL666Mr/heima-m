import request from '@/utils/request'
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}

export const getUserCode = () => {
  return request({
    url: '/v1_0/user'
  })
}
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
/**
 *
 * @param {昵称} name
 * @param {性别,0-男,1-女} gender
 * @param {生日} birthday
 * @param {个人介绍} intro
 * @returns
 */
export const setUserProfile = (name, gender, birthday, intro) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: { name, gender, birthday, real_name: 'realName', intro }
  })
}
export const setUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data,
    timeout: 50000
  })
}

// 关注用户
export const setFollowings = (target) => {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target }
  })
}
// 取消关注用户
export const deleteFollowings = (target) => {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
