import axios from 'axios'

export default {
  getUsers () {
    return axios.get(`${this.apiUrl}/users`)
  },

  getUser (userId) {
    return axios.get(`${this.apiUrl}/users/${userId}`)
  },

  patchUser (userId, data) {
    return axios.patch(`${this.apiUrl}/users/${userId}`, data)
  },

  putUser (data) {
    return axios.put(`${this.apiUrl}/users`, data)
  },

  deleteUser (userId) {
    return axios.delete(`${this.apiUrl}/users/${userId}`, {})
  }
}
