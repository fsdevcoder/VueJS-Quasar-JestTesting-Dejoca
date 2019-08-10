<template>
  <q-page>
    <div>
      <q-toolbar>
        <q-tabs>
          <q-route-tab icon="home" :to="{ path: `${urlScope}/locations/${this.locationId}` }"/>
          <q-route-tab
            icon="device_hub"
            :to="{ path: `${urlScope}/locations/${this.locationId}/devices` }"
          />
        </q-tabs>
      </q-toolbar>
    </div>

    <div>
      <router-view/>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Location',
  props: ['locationId', 'currentUserScoped'],
  data: () => ({}),

  computed: {
    urlScope () {
      return this.currentUserScoped ? '/my' : ''
    }
  },

  created () {}
}
</script>
