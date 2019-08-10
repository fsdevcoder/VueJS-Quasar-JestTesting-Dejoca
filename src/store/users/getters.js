export function all (state) {
  return Object.values(state.users)
}

export function my (state, getters, rootState, rootGetters) {
  // let id = rootGetters['auth/currentUser'].id

  // return Object.values(state.users).filter(
  //   (d) => {
  //     return d.users.includes(id)
  //   }
  // )
  return []
}

export function byId (state) {
  return (id) => state.users[id] || false
}
