import axios from 'axios'

export default {
  getLocations (userId) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations`
    } else {
      url = `${this.apiUrl}/locations`
    }

    return axios.get(url)
  },

  getLocation (userId, locationId) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}`
    } else {
      url = `${this.apiUrl}/locations/${locationId}`
    }

    return axios.get(url)
  },

  patchLocation (userId, locationId, data) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}`
    } else {
      url = `${this.apiUrl}/locations/${locationId}`
    }

    return axios.patch(url, data)
  },

  putLocation (userId, data) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations`
    } else {
      url = `${this.apiUrl}/locations`
    }

    return axios.put(url, data)
  },

  deleteLocation (userId, locationId) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}`
    } else {
      url = `${this.apiUrl}/locations/${locationId}`
    }

    return axios.delete(url, {})
  }
}
