<template>
  <div class="q-pa-md row">
    <div class="col">
      <h3>
        {{ device.title }}
        <q-btn class="on-right" round flat icon="mdi-pencil" @click="editDevice()"/>
        <br>
        <span class="q-caption text-light">{{ device.id }}</span>
      </h3>

      <div v-if="editMode">
        <q-input v-model="device.title" label="Title">
          <template v-slot:prepend>
            <q-icon color="primary" name="mdi-memory"/>
          </template>
        </q-input>

        <q-input v-model="device.notes" float-label="Notes">
          <template v-slot:prepend>
            <q-icon color="secondary" name="mdi-text"/>
          </template>
        </q-input>

        <div class="q-pt-lg">
          <q-btn color="primary" icon="save" @click="saveDevice" label="save"/>
          <q-btn
            color="negative"
            icon="delete"
            @click="destroyDevice"
            class="on-right"
            label="delete"
          />
        </div>
      </div>

      <div v-else>
        <h5>Notes</h5>
        <p>{{ device.notes }}</p>

        <h5>Location</h5>
        <router-link
          :to="`/locations/${device.location_id}`"
        >{{ getLocationTitle(device.location_id) }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Device',
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
    }
  },

  methods: {
    getLocationTitle (id) {
      return this.$store.getters['locations/byId'](id).title || id
    },

    saveDevice () {
      let userId = this.currentUserScoped ? this.me.id : null
      this.$store.dispatch('devices/update', {
        userId,
        locationId: this.locationId,
        deviceId: this.deviceId
      })
    },

    destroyDevice () {
      let userId = this.currentUserScoped ? this.me.id : null
      this.$store
        .dispatch('devices/destroy', {
          userId,
          locationId: this.locationId,
          deviceId: this.deviceId
        })
        .then(() => {
          this.$router.push({
            path: `${this.scope}/locations/${this.locationId}/devices`
          })
        })
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    editDevice () {
      if (this.hasPerm('can_edit_devices')) {
        this.editMode = !this.editMode
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permissions to edit devices'
        })
      }
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
