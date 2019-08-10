<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar  class="shadow-2" >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title style="width=100%; margin:0; padding:0">
          Welcome to Dijoca!
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      elevated v-model="leftDrawerOpen" class="shadow-2" content-class="bg-white">
      <q-list>
        <q-item  style="width=100%; margin:0; padding:0">
          <q-item-section>
            <img src="/statics/white_logo.png" style="width=100%; margin:0; padding:0">
          </q-item-section>
        </q-item>
        <!-- <img src="assets/Dijoca logo.png" class="avatar"> -->
        <q-item style="height:80px">
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold">Victor Semenkov</q-item-label>
            <q-item-label caption>victorsemenkov@gmail.com</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable tag="a" target="_blank" href="#">
          <q-item-section avatar class="text-primary">
            <q-icon name="mdi-monitor-dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="#">
          <q-item-section avatar class="text-primary">
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Places</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="#">
          <q-item-section avatar class="text-primary">
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign Out</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="stylus">
  q-toolbar-title
    color #1697a6
    background-color $grey-5
</style>
