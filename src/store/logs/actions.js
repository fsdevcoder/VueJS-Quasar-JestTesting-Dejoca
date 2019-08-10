// for outcoming events
export function importLogEntry (store, data) {
  store.commit('importLogEntry', data)
}

// for generated on the client side events
export function create (store, data) {
  store.commit('importLogEntry', data)
}
