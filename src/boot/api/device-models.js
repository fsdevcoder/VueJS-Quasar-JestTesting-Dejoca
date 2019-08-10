import axios from 'axios'

export default {
  getDeviceModels () {
    let url = ''

    url = `${this.apiUrl}/device-models`

    return axios.get(url)
  }
}
