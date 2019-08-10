<template>
  <q-page padding>
    <h3>{{ location.title }}
      <q-btn class="on-right" round flat icon="mdi-pencil" @click="editLocation()"/>
      <br><span class="q-caption text-light">{{ location.id }}</span>
    </h3>

    <div v-if="editMode">
      <h5>Location Details</h5>

      <q-field
        icon-color="primary"
        icon="mdi-map-marker"
        >
        <q-input v-model="location.address" float-label="Address"/>
      </q-field>

      <q-field
        icon-color="positive"
        icon="mdi-tree"
        >
        <q-input v-model="location.title" float-label="Title"/>
      </q-field>

      <div class="q-pt-lg">
        <q-btn color="primary" icon="save" @click="saveLocation"
          label="save"/>
        <q-btn color="negative" icon="delete" @click="destroyLocation" class="on-right"
          label="delete"/>
      </div>
    </div>

    <div v-else>
      <h5>Address</h5>
      <p>{{ location.address }}</p>

      <h5>Users Count</h5>
      <p>{{ location.users.length }}</p>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LocationDetails',
  props: ['locationId', 'currentUserScoped'],
  data: () => ({
    editMode: false
  }),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    location () {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },

  methods: {
    saveLocation () {
      this.$store.dispatch('locations/update', {
        locationId: this.locationId
      })
    },
    destroyLocation () {
      let userId = this.currentUserScoped ? this.me.id : null
      this.$store.dispatch('locations/destroy', {
        userId,
        locationId: this.locationId
      }).then(() => {
        let scope = this.currentUserScoped ? '/my' : ''
        this.$router.push({ path: `${scope}/locations` })
      })
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    editLocation () {
      if (this.hasPerm('can_edit_locations')) {
        this.editMode = !this.editMode
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permissions to edit locations'
        })
      }
    }
  },

  created () {
    let userId = this.currentUserScoped ? this.me.id : null
    this.$store.dispatch('locations/loadLocation', {
      userId: userId,
      locationId: this.locationId
    })
  }
}
</script>
