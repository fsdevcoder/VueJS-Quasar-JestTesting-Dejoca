import axios from 'axios'

export default {
  sendEmailConfirmation (userId) {
    return axios.get(`${this.apiUrl}/send-email-confirmation/${userId}`)
  },
  confirmEmail ({ email, token }) {
    return axios.get(
      `${this.apiUrl}/confirm-email?email=${email}&token=${token}`
    )
  },
  resetPassword ({ email }) {
    return axios.get(`${this.apiUrl}/reset-password?email=${email}`)
  }
}
