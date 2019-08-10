import Vue from 'vue'

export function importUser (state, newUser) {
  if (newUser.id) {
    Vue.set(state.users, newUser.id, newUser)
  }
}

export function importUsers (state, newUsers) {
  for (let i = 0; i < newUsers.length; i++) {
    importUser(state, newUsers[i])
  }
}

export function removeUser (state, userId) {
  Vue.delete(state.users, userId)
}
