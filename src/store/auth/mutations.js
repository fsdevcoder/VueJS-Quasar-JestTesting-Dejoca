export function login (state, { token, exp }) {
  localStorage.setItem('token', token)
  localStorage.setItem('exp', exp)
  state.token = token
  state.exp = exp
}

export function logout (state) {
  localStorage.removeItem('token')
  localStorage.removeItem('exp')
  state.token = ''
  state.exp = null

  state.currentUser = null
}

export function setCurrentUser (state, userData) {
  state.currentUser = userData
}

export function setPermissions (state, permissions) {
  state.permissions = permissions
}
