export function all (state) {
  return Object.values(state.devices)
}

export function my (state, getters, rootState, rootGetters) {
  // let id = rootGetters['auth/currentUser'].id

  // return Object.values(state.devices).filter(
  //   (d) => {
  //     return d.users.includes(id)
  //   }
  // )
  return []
}

export function byLocationId (state, getters) {
  return (locationId) => getters['all'].filter((d) => d.location_id === locationId)
}

export function byId (state) {
  return (id) => state.devices[id] || false
}
