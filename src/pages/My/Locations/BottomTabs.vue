<template>
  <q-tabs active-color="white" indicator-color="transparent" class="text-grey">
    <q-route-tab
      name="home"
      icon="home"
      label="Home"
      :to="{ path: `/my/places/${this.locationId}` }"
    />
    <q-route-tab
      name="schedule"
      icon="mdi-calendar-month"
      label="Schedule"
      :to="{ path: `/my/places/${this.locationId}/schedule` }"
    />
    <q-route-tab
      name="zones"
      icon="mdi-view-quilt"
      label="Zones"
      :to="{ path: `/my/places/${this.locationId}/zones` }"
    />
    <q-route-tab
      name="history"
      icon="mdi-history"
      label="History"
      :to="{ path: `/my/places/${this.locationId}/history` }"
    />
    <q-route-tab
      name="details"
      icon="mdi-settings-outline"
      label="Details"
      :to="{ path: `/my/places/${this.locationId}/details` }"
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
