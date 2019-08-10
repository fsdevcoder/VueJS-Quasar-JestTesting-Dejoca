<template>
  <q-page>
    <q-toolbar class="bg-grey-3">
      <q-tabs>
        <q-route-tab icon="mdi-home" :to="`${this.scope}/devices/${this.deviceId}`" exact />

        <q-route-tab
          icon="mdi-console"
          :to="isConsoleEnabled ?`${this.scope}/devices/${this.deviceId}/console` : ``"
          :disabled="isConsoleEnabled ? false : true"
          exact
        />
        <q-route-tab icon="mdi-chip" :to="`${this.scope}/devices/${this.deviceId}/mcu`" exact>
          <q-badge
            v-if="device.mcu_errors && device.mcu_errors.length > 0"
            color="red"
            floating
          >{{ device.mcu_errors.length }}</q-badge>
        </q-route-tab>
      </q-tabs>

      <q-toolbar-title />

      <q-icon
        v-if="!device.status"
        color="negative"
        name="mdi-lan-disconnect"
        style="font-size: 2em;"
      />
      <q-icon
        v-else-if="!device.mcu_status"
        color="warning"
        name="mdi-lan-pending"
        style="font-size: 2em;"
      />
      <q-icon v-else color="positive" name="mdi-lan-connect" style="font-size: 2em;" />
    </q-toolbar>

    <div>
      <router-view />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DeviceIndex',
  props: ['locationId', 'deviceId', 'currentUserScoped'],
  data: () => ({
    editMode: false
  }),

  computed: {
    me () {
      return this.$store.getters['auth/currentUser']
    },

    log () {
      return this.$store.getters['logs/byReporterId'](this.deviceId)
    },

    device () {
      return this.$store.getters['devices/byId'](this.deviceId)
    },

    scope () {
      return `${this.currentUserScoped ? '/my' : ''}${
        this.locationId ? `/locations/${this.locationId}` : ''
      }`
    },

    isConsoleEnabled () {
      return this.hasPerm('can_edit_devices')
    }
  },

  methods: {
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    }
  },

  created () {
    let userId = this.currentUserScoped ? this.me.id : null
    this.$store.dispatch('devices/loadDevice', {
      userId: userId,
      locationId: this.locationId,
      deviceId: this.deviceId
    })
    this.$store.dispatch('locations/loadLocations', userId)
  }
}
</script>
