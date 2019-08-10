import axios from 'axios'

export default {
  getDevices (userId, locationId) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}/devices`
    } else if (locationId) {
      url = `${this.apiUrl}/locations/${locationId}/devices`
    } else {
      url = `${this.apiUrl}/devices`
    }

    return axios.get(url)
  },

  getDevice (userId, locationId, deviceId) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}/devices/${deviceId}`
    } else if (locationId) {
      url = `${this.apiUrl}/locations/${locationId}/devices/${deviceId}`
    } else {
      url = `${this.apiUrl}/devices/${deviceId}`
    }

    return axios.get(url)
  },

  patchDevice (userId, locationId, deviceId, data) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}/devices/${deviceId}`
    } else if (locationId) {
      url = `${this.apiUrl}/locations/${locationId}/devices/${deviceId}`
    } else {
      url = `${this.apiUrl}/devices/${deviceId}`
    }

    return axios.patch(url, data)
  },

  putDevice (userId, locationId, data) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}/devices`
    } else if (locationId) {
      url = `${this.apiUrl}/locations/${locationId}/devices`
    } else {
      url = `${this.apiUrl}/devices`
    }

    return axios.put(url, data)
  },

  deleteDevice (userId, locationId, deviceId) {
    let url = ''

    if (userId) {
      url = `${this.apiUrl}/users/${userId}/locations/${locationId}/devices/${deviceId}`
    } else if (locationId) {
      url = `${this.apiUrl}/locations/${locationId}/devices/${deviceId}`
    } else {
      url = `${this.apiUrl}/devices/${deviceId}`
    }

    return axios.delete(url, {})
  }
}
