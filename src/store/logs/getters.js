export function all (state) {
  return state.entries
}

export function byReporterId (state, getters) {
  return (reporterId) => getters['all'].filter((d) => d.reporterId === reporterId)
}
