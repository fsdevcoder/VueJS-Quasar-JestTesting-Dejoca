import Vue from 'vue'

export function importDeviceType (state, type) {
  if (type.id) {
    Vue.set(state.types, type.id, type)
  }
}

export function importDeviceTypes (state, types) {
  for (let i = 0; i < types.length; i++) {
    importDeviceType(state, types[i])
  }
}

export function removeDeviceType (state, typeId) {
  Vue.delete(state.types, typeId)
}
