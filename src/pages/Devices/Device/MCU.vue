<template>
  <div class="q-pa-md">
    <div v-if="device.mcu_errors.length > 0">
      <div v-for="(e, i) in device.mcu_errors" :key="`error-line-${i}`">MCU error code: {{ e }}</div>
    </div>
    <h3 v-else>MCU status is OK</h3>
  </div>
</template>

<script>
export default {
  name: 'DeviceMCU',
  props: ['deviceId'],
  data: () => ({
  }),

  computed: {
    me () {
      return this.$store.getters['auth/currentUser']
    },

    device () {
      return this.$store.getters['devices/byId'](this.deviceId)
    }
  },

  methods: {
  }
}
</script>

<style lang="stylus">
</style>
