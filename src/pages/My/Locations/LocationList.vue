<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="location in locations" :key="location.id">
        <q-img :ratio="16/11" src="/statics/placeholders/place-placeholder.jpg">
          <div class="absolute-bottom">
            <div class="text-h6">{{ location.title }}</div>
            <div class="text-subtitle2">{{ addressTandem(location) }}</div>
          </div>
        </q-img>
        <q-card-section>
          <div>2 SmartHubs</div>
          <div>26 Zones</div>
          <div>15 Connected Devices</div>
        </q-card-section>
        <q-card-actions>
          <q-btn flat @click="selectLocation(location)">Open Place</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card text-blue-grey-3" v-if="locations.length === 0">
        <q-card-section class="q-pt-xl flex row justify-center">
          <div style="font-size: 1.5em; font-weight: bold">ADD NEW PLACE</div>
        </q-card-section>
        <q-card-section vertical class="q-py-xl flex row justify-center">
          <q-btn
            size="35px"
            round
            color="blue-grey-2"
            icon="mdi-plus"
            class="q-py-sm"
            @click.native="addLocation()"
          />
        </q-card-section>
      </q-card>
      <q-page-sticky v-else position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="accent" @click.native="addLocation()" />
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { countrySettings } from '../../../helpers/countrySettings'

export default {
  name: 'Locations',
  data () {
    return {
      countrySettings: countrySettings()
    }
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    locations () {
      return this.$store.getters['locations/my']
    }
  },

  methods: {
    currentCountryConfig (country) {
      return this.countrySettings[country] || this.countrySettings.default
    },
    addressTandem (location) {
      if (location.address) {
        return this.currentCountryConfig(location.address.country).getTandem(location.address)
      } else {
        return ''
      }
    },
    getUserName (id) {
      let user = this.$store.getters['users/byId'](id)
      if (user) {
        return `${user.fname} ${user.lname}`
      } else {
        return id
      }
    },
    createLocation () {
      let userId = this.me.id
      let data = {
        title: 'New Location'
      }
      this.$store.dispatch('locations/create', { userId, data })
    },
    selectLocation (location) {
      this.$router.push({ path: `places/${location.id}` })
    },
    addLocation () {
      this.createLocation()
    },
    loadLocations () {
      if (this.me) {
        this.$store.dispatch('locations/loadLocations', this.me.id)
      }
    }
  },

  watch: {
    me () {
      this.loadLocations()
    }
  },

  created () {
    this.loadLocations()
  }
}
</script>

<style lang="stylus" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
