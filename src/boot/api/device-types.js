import axios from 'axios'

export default {
  getDeviceTypes () {
    let url = ''

    url = `${this.apiUrl}/device-types`

    return axios.get(url)
  }
}
