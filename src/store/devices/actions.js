import { api } from '../../boot/api'

export function loadDevices (store, { userId, locationId }) {
  return new Promise((resolve, reject) => {
    api.getDevices(userId, locationId).then(
      response => {
        store.commit('importDevices', response.data)
        resolve()
      },
      response => {
        console.log(response)
        reject()
      }
    )
  })
}

export function loadDevice (store, { userId, locationId, deviceId }) {
  return new Promise((resolve, reject) => {
    api.getDevice(userId, locationId, deviceId).then(
      response => {
        store.commit('importDevice', response.data)
        resolve()
      },
      response => {
        console.log(response)
        reject()
      }
    )
  })
}

export function importDevice (store, device) {
  store.commit('importDevice', device)
}
export function importDevices (store, devices) {
  store.commit('importDevices', devices)
}

export function update (store, { userId, locationId, deviceId }) {
  let data = store.getters['byId'](deviceId)

  return new Promise((resolve, reject) => {
    api
      .patchDevice(userId, locationId, deviceId, data)
      .then(response => {}, response => {})
  })
}

export function create (store, { userId, locationId, data }) {
  return new Promise((resolve, reject) => {
    api.putDevice(userId, locationId, data).then(
      response => {
        store.commit('importDevice', response.data)
      },
      response => {}
    )
  })
}

export function destroy (store, { userId, locationId, deviceId }) {
  return new Promise((resolve, reject) => {
    api.deleteDevice(userId, locationId, deviceId).then(
      response => {
        store.commit('removeDevice', deviceId)
        resolve()
      },
      response => {}
    )
  })
}
