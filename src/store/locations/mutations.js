import Vue from 'vue'

export function importLocation (state, newLocation) {
  if (newLocation.id) {
    Vue.set(state.locations, newLocation.id, newLocation)
  }
}

export function importLocations (state, newLocations) {
  for (let i = 0; i < newLocations.length; i++) {
    let g = newLocations[i]

    importLocation(state, g)
  }
}

export function removeLocation (state, locationId) {
  Vue.delete(state.locations, locationId)
}
