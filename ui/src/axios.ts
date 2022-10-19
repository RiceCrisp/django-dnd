import axios from 'axios'

const baseURL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token') ? `JWT ${localStorage.getItem('access_token')}` : '',
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data)
    const originalRequest = error.config

    // Prevent infinite loops early
    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === baseURL + '/auth/jwt/refresh'
    // ) {
    //   window.location.href = '/login/'
    //   return Promise.reject(error)
    // }

    // Something has gone wrong so just reset tokens
    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401
    ) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 403 &&
      error.response.statusText === 'Forbidden'
    ) {
      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000)

        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/auth/jwt/refresh', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access_token', response.data.access)
              localStorage.setItem('refresh_token', response.data.refresh)

              axiosInstance.defaults.headers.common.Authorization = 'JWT ' + response.data.access
              originalRequest.headers.Authorization = 'JWT ' + response.data.access

              return axiosInstance(originalRequest)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          console.log('Refresh token is expired', tokenParts.exp, now)
          window.location.href = '/login/'
        }
      }
      else {
        console.log('Refresh token not available.')
        window.location.href = '/login/'
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  }
)

export default axiosInstance
