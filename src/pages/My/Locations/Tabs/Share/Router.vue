<template>
  <q-page>
    <div>
      <router-view/>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LocationDetails',
  props: ['locationId'],
  data: () => ({
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
  }
}
</script>
