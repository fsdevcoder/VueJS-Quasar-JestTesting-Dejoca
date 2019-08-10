import { api } from '../../boot/api'

export function loadLocations (store, userId) {
  return new Promise((resolve, reject) => {
    api.getLocations(userId).then(
      response => {
        store.commit('importLocations', response.data)
        resolve(response)
      },
      response => {
        console.log(response)
        reject(response)
      }
    )
  })
}

export function loadLocation (store, { userId, locationId }) {
  return new Promise((resolve, reject) => {
    api.getLocation(userId, locationId).then(
      response => {
        store.commit('importLocation', response.data)
        resolve(response)
      },
      response => {
        console.log(response)
        reject(response)
      }
    )
  })
}

export function update (store, { userId, locationId }) {
  let data = store.getters['byId'](locationId)

  return new Promise((resolve, reject) => {
    api
      .patchLocation(userId, locationId, data)
      .then(resolve, reject)
  })
}

export function create (store, { userId, data }) {
  return new Promise((resolve, reject) => {
    api.putLocation(userId, data).then(
      response => {
        store.commit('importLocation', response.data)
        resolve(response)
      },
      reject
    )
  })
}

export function destroy (store, { userId, locationId }) {
  return new Promise((resolve, reject) => {
    api.deleteLocation(userId, locationId).then(
      response => {
        store.commit('removeLocation', locationId)
        resolve(response)
      },
      reject
    )
  })
}
