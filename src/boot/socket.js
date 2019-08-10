import _store from '../store'

let store = _store()

function handleMessage (data) {
  if (data.type) {
    switch (data.type) {
      case 'device':
        store.dispatch('devices/importDevice', data.payload)
        break

      case 'log':
        store.dispatch('logs/importLogEntry', data.payload)
        break

      default:
    }
  }
}

export default ({ Vue }) => {
  let socket = {
    init () {
      this.websocket = new WebSocket(
        `${process.env.apiWsUrl}/websocket?token=${store.getters['auth/token']}`
      )

      this.websocket.onopen = function (evt) {
        console.log(evt)
      }
      this.websocket.onclose = function (evt) {
        console.log(evt)
        socket.init()
      }
      this.websocket.onmessage = function (evt) {
        try {
          handleMessage(JSON.parse(evt.data))
        } catch (e) {
          console.log(e)
          console.log(evt)
        }
      }
      this.websocket.onerror = function (evt) {
        console.log(evt)
      }
    },

    send (data) {
      this.websocket.send(data)
    }
  }

  Vue.prototype.$socket = socket
}
