<template>
  <q-page>
    <router-view name="top" />

    <div>
      <router-view />
    </div>

    <q-footer bordered class="bg-secondary text-white">
      <router-view name="bottom" />
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'MyLocationLayout',
  data: () => ({})
}
</script>
