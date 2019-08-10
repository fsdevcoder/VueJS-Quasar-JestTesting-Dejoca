<template>
  <q-toolbar class="shadow-2 bg-primary">
    <q-btn
      v-if="routeMeta.backButton === 'back'"
      flat
      round
      dense
      @click="goBack()"
      :icon="routeMeta.backButtonIcon"
    >
      <q-tooltip
        v-if="routeMeta.backButtonTooltip"
        content-class="bg-indigo-3"
        content-style="font-size: 16px"
        :offset="[10, 10]"
      >{{ routeMeta.backButtonTooltip }}</q-tooltip>
    </q-btn>
    <q-toolbar-title>{{ routeMeta.title }}</q-toolbar-title>
    <q-btn flat dense round @click="toggleDrawer" aria-label="Menu">
      <q-icon name="menu" />
    </q-btn>
  </q-toolbar>
</template>

<script>
export default {
  name: 'DefaultSecureHeader',
  data () {
    return {
      routeMeta: {
        backButtonTooltip: '',
        backButtonPath: '',
        backButtonIcon: '',
        backButton: '',
        title: ''
      }
    }
  },
  methods: {
    goBack () {
      if (this.routeMeta.backButtonPath === -1) {
        this.$router.go(-1)
      } else {
        this.$router.push({ path: this.routeMeta.backButtonPath })
      }
    },
    toggleDrawer () {
      this.$root.$emit('toggle-drawer')
    },
    updateRouteMeta (meta) {
      Object.keys(meta).forEach(el => {
        if (meta[el]) this.routeMeta[el] = meta[el]
      })
    }
  },
  watch: {
    '$route.meta': function () {
      this.updateRouteMeta(this.$route.meta)
    }
  },
  created () {
    this.updateRouteMeta(this.$route.meta)

    this.$root.$on('update-route-meta', meta => this.updateRouteMeta(meta))
  }
}
</script>
