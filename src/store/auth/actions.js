import { api } from '../../boot/api'
import axios from 'axios'

export function login (store, creds) {
  return new Promise((resolve, reject) => {
    api.login(creds).then(
      response => {
        store.commit('login', response.data)
        setAxiosHeaders(response.data.token)

        store.dispatch('loadCurrentUser')
        resolve(response)
      },
      response => {
        console.log(response)
        reject(response)
      }
    )
  })
}
export function logout (store) {
  return new Promise((resolve, reject) => {
    store.commit('logout')
    resolve()
  })
}

export function loadCurrentUser (store) {
  return new Promise((resolve, reject) => {
    api.getCurrentUser().then(
      response => {
        store.commit('setCurrentUser', response.data)
        resolve(response)
      },
      response => {
        console.log(response)
        reject(response)
      }
    )
  })
}

export function updateCurrentUser (store, data) {
  return new Promise((resolve, reject) => {
    api.patchCurrentUser(data).then(
      response => {
        store.dispatch('loadCurrentUser')
        resolve(response)
      },
      response => {
        reject(response)
      })
  })
}

export function loadPermissionsList (store) {
  return new Promise((resolve, reject) => {
    api.getPermissions().then(
      response => {
        store.commit('setPermissions', response.data)
        resolve(response)
      },
      response => {
        console.log(response)
        reject(response)
      }
    )
  })
}

export function checkLoggedIn (store) {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('token')
    let exp = localStorage.getItem('exp')

    if (token) {
      store.commit('login', { exp, token })
      setAxiosHeaders(token)

      store.dispatch('loadCurrentUser').then(resolve, () => {
        store.commit('logout')
        reject()
      })
    } else {
      reject()
    }
  })
}

function setAxiosHeaders (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
