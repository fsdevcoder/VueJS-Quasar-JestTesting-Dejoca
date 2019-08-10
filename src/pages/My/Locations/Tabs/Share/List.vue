<template>
  <div>
    <div class="flex absolute-center">
      <q-img
        style="height: 270px; width: 270px"
        :ratio="19/11"
        src="/statics/placeholders/under-construction.png"
      >
        <div class="absolute-top">
          <div class="text-h4">Shared Access</div>
        </div>
      </q-img>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="mdi-account-plus"
        color="accent"
        :to="`/my/places/${this.locationId}/share/add`"
      />
    </q-page-sticky>
  </div>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LocationDetails',
  props: ['locationId'],
  data: () => ({}),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    location() {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },

  methods: {},

  watch: {
    me() {
      if (this.me) {
        this.$store.dispatch('locations/loadLocation', {
          userId: this.me.id,
          locationId: this.locationId
        })
        this.$route.meta.backButtonPath = `/my/places/${this.locationId}/details`
      }
    }
  },

  created() {
    if (this.me) {
      this.$store.dispatch('locations/loadLocation', {
        userId: this.me.id,
        locationId: this.locationId
      })
      this.$route.meta.backButtonPath = `/my/places/${this.locationId}/details`
    }
  }
}
</script>
