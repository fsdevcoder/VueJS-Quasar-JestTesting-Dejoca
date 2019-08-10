<template>
  <div class="q-pa-md">
    <div class="terminal q-pa-md" id="device-terminal">
      <pre v-for="(entry, i) in log" :key="i">> {{ entry.data }}</pre>
    </div>

    <q-select v-model="topic" :options="topics" label="Topic" emit-value map-options/>

    <q-input
      v-model="mqttCommand"
      type="textarea"
      label="Command"
      :max-height="100"
      rows="2"
      @keyup.enter="sendCommand"
    >
      <template v-slot:prepend>
        <q-icon color="secondary" name="mdi-console"/>
      </template>
    </q-input>

    <q-btn
      color="primary"
      icon="check"
      @click="sendCommand"
      class="q-mt-md float-right"
      label="send"
    />
  </div>
</template>

<script>
export default {
  name: 'DeviceConsole',
  props: ['deviceId'],
  data: () => ({
    mqttCommand: '',
    topic: 'loopback',
    topics: [
      {
        label: 'loopback',
        value: 'loopback'
      },
      {
        label: 'ota',
        value: 'ota'
      },
      {
        label: 'cmd',
        value: 'cmd'
      },
      {
        label: 'root',
        value: ''
      }
    ]
  }),

  watch: {
    log () {
      this.$nextTick(() => {
        let container = this.$el.querySelector('#device-terminal')
        container.scrollTop = container.scrollHeight
      })
    }
  },

  computed: {
    me () {
      return this.$store.getters['auth/currentUser']
    },

    log () {
      return this.$store.getters['logs/byReporterId'](this.deviceId)
    },

    device () {
      return this.$store.getters['devices/byId'](this.deviceId)
    }
  },

  methods: {
    sendCommand () {
      this.$socket.send(
        JSON.stringify({
          type: 'mqttCommand',
          data: {
            deviceId: this.device.id,
            locationId: this.device.location_id,
            topic: this.topic,
            data: this.mqttCommand
          }
        })
      )

      this.$store.dispatch('logs/create', {
        reporterId: this.deviceId,
        data: {
          command: this.mqttCommand
        }
      })
      this.mqttCommand = ''
    }
  }
}
</script>

<style lang="stylus">
.terminal {
  background: #eee;
  height: 300px;
  max-height: 300px;
  overflow: auto;
  font-size: 10px;
}
</style>
