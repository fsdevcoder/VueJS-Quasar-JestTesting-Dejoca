export function all (state) {
  return Object.values(state.locations)
}
export function my (state, getters, rootState, rootGetters) {
  let user = rootGetters['auth/currentUser']

  if (user) {
    let id = rootGetters['auth/currentUser'].id

    return Object.values(state.locations).filter(
      (d) => {
        return d.users.includes(id)
      }
    )
  } else {
    return []
  }
}

export function byId (state) {
  return (id) => state.locations[id] || false
}
