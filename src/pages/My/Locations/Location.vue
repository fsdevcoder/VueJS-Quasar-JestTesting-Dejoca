<template>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyLocation',
  props: ['locationId'],
  data: () => ({}),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    location () {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },

  methods: {
    updateRouteMeta (m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    loadLocation () {
      console.log('-load dlocation-')
      console.log(this.locationId)
      if (this.me) {
        if (this.location) {
          this.updateRouteMeta({ title: this.location.title })
        } else {
          this.$store
            .dispatch('locations/loadLocation', {
              userId: this.me.id,
              locationId: this.locationId
            })
            .then(() => this.updateRouteMeta({ title: this.location.title }))
        }
      }
    }
  },

  watch: {
    me () {
      return this.loadLocation()
    }
  },
  created () {
    return this.loadLocation()
  },
  updated () {
    return this.loadLocation()
  }
}
</script>
