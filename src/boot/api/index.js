import auth from './auth'
import utils from './utils'
import users from './users'
import locations from './locations'
import devices from './devices'
import deviceModels from './device-models'
import deviceSoftware from './device-software'
import deviceTypes from './device-types'

export let api = {
  apiUrl: process.env.apiUrl,
  // apiUrl: 'http://34.73.17.30:8085',
  // apiUrl: 'http://35.196.153.144',

  ...auth,
  ...utils,
  ...users,
  ...locations,
  ...devices,
  ...deviceModels,
  ...deviceSoftware,
  ...deviceTypes
}

export default ({ Vue }) => {
  Vue.prototype.$api = api
}
