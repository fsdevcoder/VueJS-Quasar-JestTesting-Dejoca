export function token (state) {
  return state.token
}

export function currentUser (state) {
  return state.currentUser
}

export function permissions (state) {
  return state.permissions
}

export function hasPerm (state) {
  return (perm) => state.currentUser && state.currentUser.perms.indexOf(perm) >= 0
}
