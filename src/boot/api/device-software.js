import axios from 'axios'

export default {
  getDeviceSoftwares (modelId) {
    let url = ''

    url = `${this.apiUrl}/device-models/${modelId}/software`

    return axios.get(url)
  }
}
