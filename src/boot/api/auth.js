import axios from 'axios'

export default {
  login (creds) {
    return axios.post(`${this.apiUrl}/session`, creds)
  },

  signup (data) {
    return axios.put(`${this.apiUrl}/signup`, data)
  },

  getCurrentUser () {
    return axios.get(`${this.apiUrl}/me`)
  },

  patchCurrentUser (data) {
    return axios.patch(`${this.apiUrl}/me`, data)
  },

  getPermissions () {
    return axios.get(`${this.apiUrl}/permissions`)
  }
}
