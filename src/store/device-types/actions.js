import { api } from '../../boot/api'

export function loadDeviceTypes (store) {
  return new Promise((resolve, reject) => {
    api.getDeviceTypes().then(
      response => {
        store.commit('importDeviceTypes', response.data)
        resolve()
      },
      response => {
        console.log(response)
        reject()
      }
    )
  })
}

// export function update(store, { userId, locationId, deviceId }) {
//   let data = store.getters['byId'](deviceId)

//   return new Promise((resolve, reject) => {
//     api
//       .patchDevice(userId, locationId, deviceId, data)
//       .then(response => {}, response => {})
//   })
// }

// export function create(store, { userId, locationId, data }) {
//   return new Promise((resolve, reject) => {
//     api.putDevice(userId, locationId, data).then(
//       response => {
//         store.commit('importDevice', response.data)
//       },
//       response => {}
//     )
//   })
// }

// export function destroy(store, { userId, locationId, deviceId }) {
//   return new Promise((resolve, reject) => {
//     api.deleteDevice(userId, locationId, deviceId).then(
//       response => {
//         store.commit('removeDevice', deviceId)
//         resolve()
//       },
//       response => {}
//     )
//   })
// }
