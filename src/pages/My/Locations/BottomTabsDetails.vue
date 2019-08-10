<template>
  <q-tabs indicator-color="transparent" class="text-white">
    <q-route-tab
      name="home"
      icon="home"
      label="Home"
      :to="{ path: `/my/places/${this.locationId}` }"
    />
    <q-route-tab
      name="share"
      icon="mdi-share-variant"
      label="Share"
      :to="{ path: `/my/places/${this.locationId}/share` }"
    />
    <q-route-tab
      name="delete"
      icon="mdi-trash-can-outline"
      label="Delete"
      :to="{ path: `/my/places/${this.locationId}` }"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'MyLocationBottomTabsPart',
  props: ['locationId'],
  data: () => ({})
}
</script>
