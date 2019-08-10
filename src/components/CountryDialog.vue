<template>
  <q-card>
    <q-toolbar>
      <q-toolbar-title>Pick your country:</q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>
    <q-card-actions class="q-ml-md column">
      <div class="q-mb-md q-ml-sm">Frequently searched:</div>
      <q-btn
        :key="`country-dialog-fsc-${item.value}`"
        v-for="(item, index) in frequently"
        align="left"
        class="q-mr-md q-mb-md bg-blue-grey-1"
        :class="index==0 ? 'q-ml-sm': ''"
        @click="CountrySelected(item.value)"
        v-close-popup
      >
        &nbsp;
        <country-flag :country="item.value" size="big" />
        <span class="q-ml-sm">{{ item.label }}</span>
      </q-btn>
      <!-- All Countries -->
      <br />
      <div class="q-mb-md q-ml-sm">All countries:</div>
      <q-btn
        :key="`country-dialog-ac-${item.value}`"
        v-for="(item, index) in countries"
        align="left"
        class="q-mr-md q-mb-md bg-blue-grey-1"
        :class="index==0 ? 'q-ml-sm': ''"
        @click="CountrySelected(item.value)"
        v-close-popup
      >
        &nbsp;
        <country-flag :country="item.value" size="big" />
        <span class="q-ml-sm">{{ item.label }}</span>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import countryFlag from 'vue-country-flag'
import { countries } from '../helpers/geo'

export default {
  data () {
    return {
      frequently: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'gb' },
        { label: 'Australia', value: 'au' },
        { label: 'New Zealand', value: 'nz' }
      ],
      countries: countries().map(this.toOptions)
    }
  },
  components: { countryFlag },
  computed: {
    showDialogLocal: {
      get () {
        return !!this.showDialog
      },
      set () {
        return true
      }
    }
  },
  methods: {
    toOptions (c) {
      return { label: c.name, value: c.abbr }
    },
    CountrySelected (country) {
      this.$emit('input', country)
    }
  }
}
</script>

<style lang="styl">
</style>
