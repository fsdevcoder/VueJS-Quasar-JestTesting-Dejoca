import Vue from 'vue'

export function importDeviceModel (state, model) {
  if (model.id) {
    Vue.set(state.models, model.id, model)
  }
}

export function importDeviceModels (state, models) {
  for (let i = 0; i < models.length; i++) {
    importDeviceModel(state, models[i])
  }
}

export function removeDeviceModel (state, modelId) {
  Vue.delete(state.models, modelId)
}
