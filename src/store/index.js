import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import users from './users'
import devices from './devices'
import deviceSoftware from './device-software'
import deviceTypes from './device-types'
import deviceModels from './device-models'
import locations from './locations'
import logs from './logs'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      users,
      locations,
      devices,
      deviceSoftware,
      deviceModels,
      deviceTypes,
      logs
    }
  })

  return Store
}
