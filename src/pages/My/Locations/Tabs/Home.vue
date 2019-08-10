<template>
  <div>
    <q-img style="max-height: 216px" src="/statics/weather/weather-sunny.jpg">
      <div class="absolute-bottom-left text-subtitle transparent q-ma-sm">
        <div class="text-h4 q-pb-sm">{{ addressTandem }}</div>
        <div class="text-h6 q-pb-sm">Sunny</div>
        <div class="text-h2">75˚F</div>
      </div>
    </q-img>
    <q-img
      src="/statics/clipart/tomato-drawing-vegetable-1.jpg"
      contain
      :ratio="5/7"
      style="opacity: 0.07; max-height:500px"
    />
  </div>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'
import { countrySettings } from '../../../../helpers/countrySettings'

export default {
  name: 'LocationDetails',
  props: ['locationId'],
  data: () => ({
    routeTab: 'home',
    countrySettings: countrySettings()
  }),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    location () {
      return this.$store.getters['locations/byId'](this.locationId)
    },
    currentCountryConfig () {
      return this.countrySettings[this.location.address.country] || this.countrySettings.default
    },
    addressTandem () {
      return this.currentCountryConfig.getTandem(this.location.address)
    }
  }
}
</script>
