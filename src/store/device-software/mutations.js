import Vue from 'vue'

export function importDeviceSoftware (state, software) {
  if (software.id) {
    Vue.set(state.software, software.id, software)
  }
}

export function importDeviceSoftwares (state, softwares) {
  for (let i = 0; i < softwares.length; i++) {
    importDeviceSoftware(state, softwares[i])
  }
}

export function removeDeviceSoftware (state, softwareId) {
  Vue.delete(state.software, softwareId)
}
