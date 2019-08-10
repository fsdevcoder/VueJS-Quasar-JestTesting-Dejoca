<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <router-view name="top"></router-view>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" :width="250" :breakpoint="400" show-if-above elevated>
      <main-menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <router-view name="bottom" />
    </q-footer>
  </q-layout>
</template>

<script>
import MainMenu from '../components/MainMenu'
import { mapGetters } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  components: { MainMenu },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    })
  },
  // beforeMount () {
  //   this.$store
  //     .dispatch('auth/checkLoggedIn')
  //     .then(() => {}, () => this.$router.push({ path: '/login' }))
  // },
  mounted () {
    this.$root.$on('toggle-drawer', () => {
      this.leftDrawerOpen = !this.leftDrawerOpen
    })
    this.$socket.init()
    this.$store.dispatch('auth/loadPermissionsList')
  }
}
</script>

<style scoped lang="styl">
</style>
