export function all (state) {
  return Object.values(state.software)
}

// export function byModelId(state, getters) {
//   return modelId => getters['all'].filter(d => d.model_id === modelId)
// }

export function byId (state) {
  return id => state.software[id] || false
}
