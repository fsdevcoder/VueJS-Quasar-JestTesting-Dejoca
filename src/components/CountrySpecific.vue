<template>
  <div class="row q-mt-md">
    <!-- City input field -->
    <q-input
      v-if="isFieldVisible('city', 'input')"
      :error="$v.city.$anyError"
      v-model.trim="city"
      :label="currentCountryConfig.city.label"
      class="input-large col q-ml-lg"
    />
    <!-- Region input field -->
    <q-input
      v-if="isFieldVisible('region', 'input')"
      :error="$v.region.$anyError"
      v-model.trim="region"
      class="input-large col q-ml-lg"
      :label="currentCountryConfig.region.label"
    />
    <!-- Province/State input field -->
    <q-input
      v-if="isFieldVisible('province', 'input')"
      :error="$v.province.$anyError"
      v-model="province"
      class="input-large col q-ml-lg"
      :label="currentCountryConfig.province.label"
    />
    <!-- Province/State select field -->
    <q-select
      v-if="isFieldVisible('province', 'select')"
      :error="$v.province.$anyError"
      v-model="province"
      :options="filterOptions"
      class="input-large col q-ml-lg"
      :label="currentCountryConfig.province.label"
      @filter="filterFn"
      use-input
      input-debounce="0"
      option-label="name"
      option-value="abbr"
    />
    <!-- Postal/zipcode input field -->
    <q-input
      v-if="isFieldVisible('postal', 'input')"
      :error="$v.postal.$anyError"
      v-model="postal"
      class="input-large col q-ml-lg"
      :label="currentCountryConfig.postal.label"
    />
  </div>
</template>

<script>
import { usStates, caProvinces, auStates, thProvinces, ruFedSubjects, byRegions } from '../helpers/geo'
import { countrySettings } from '../helpers/countrySettings'

export default {
  props: ['country', 'locationId'],
  data () {
    return {
      city: '',
      region: '',
      province: '',
      postal: '',
      usStates: usStates(),
      caProvinces: caProvinces(),
      auStates: auStates(),
      thProvinces: thProvinces(),
      ruFedSubjects: ruFedSubjects(),
      byRegions: byRegions(),

      countrySettings: countrySettings(),
      filterOptions: this.optionForProvinceSelector
    }
  },

  validations () {
    return {
      city: this.currentCountryConfig.city.validation || {},
      region: this.currentCountryConfig.region.validation || {},
      province: this.currentCountryConfig.province.validation || {},
      postal: this.currentCountryConfig.postal.validation || {}
    }
  },
  watch: {
    country () {
      this.city = ''
      this.region = ''
      this.province = ''
      this.postal = ''
    },
    location () {
      this.city = this.location.address.city
      this.region = this.location.address.region
      this.postal = this.location.address.postal
      if (this.currentCountryConfig.province.show) {
        if (this.currentCountryConfig.province.type === 'input') {
          this.province = this.location.address.province
        } else if (this.currentCountryConfig.province.type === 'select') {
          this.province = this.getProvinceObject(this.location.address.province)
        }
      }
    }
  },
  computed: {
    currentCountryConfig () {
      return this.countrySettings[this.country] || this.countrySettings.default
    },
    optionForProvinceSelector () {
      return this[this.currentCountryConfig.province.list]
    },
    location () {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },

  methods: {
    isFieldVisible (field, fieldType) {
      let cc = this.currentCountryConfig

      return cc[field].show && cc[field].type === fieldType
    },

    getProvinceObject (abbr) {
      let province = this.optionForProvinceSelector.filter(
        v => v.abbr.indexOf(abbr) > -1
      )
      console.log(province)
      return province[0]
    },

    toTitleCase (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },

    buildJson () {
      let json = {}
      json['street'] = ''
      json['country'] = this.country
      if (this.currentCountryConfig.city.show) json['city'] = this.toTitleCase(this.city)
      if (this.currentCountryConfig.region.show) json['region'] = this.toTitleCase(this.region)
      if (this.currentCountryConfig.postal.show) json['postal'] = this.postal
      if (this.currentCountryConfig.province.show) {
        if (this.currentCountryConfig.province.type === 'input') {
          json['province'] = this.toTitleCase(this.province)
        } else if (this.currentCountryConfig.province.type === 'select') {
          json['province'] = this.province.abbr
        }
      }
      return json
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.optionForProvinceSelector
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = this.optionForProvinceSelector.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  },

  mounted () {
    this.$root.$on('validate-country-specific-address', () => {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$emit('input', null)
      } else {
        this.$emit('input', this.buildJson())
      }
    })
  },
  created () {
    if (this.location.address) {
      this.city = this.location.address.city
      this.region = this.location.address.region
      this.postal = this.location.address.postal
      if (this.currentCountryConfig.province.show) {
        if (this.currentCountryConfig.province.type === 'input') {
          this.province = this.location.address.province
        } else if (this.currentCountryConfig.province.type === 'select') {
          this.province = this.getProvinceObject(this.location.address.province)
        }
      } else {
        this.province = ''
      }
    }
  }
}
</script>

<style lang="styl">
</style>
