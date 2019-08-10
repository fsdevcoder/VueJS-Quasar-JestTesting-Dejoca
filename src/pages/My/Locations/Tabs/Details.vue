<template>
  <q-page>
    <q-img
      :src="imgURL"
      spinner-color="white"
      :ratio="16/7"
      style="max-height: 40vh; max-width: 100%"
    >
      <q-btn
        size="35px"
        icon="mdi-camera"
        color="white"
        outline
        unelevated
        flat
        @click.native="changePic()"
        style="opacity: 0.7"
        class="absolute-bottom-right"
      />
    </q-img>

    <div class="q-mx-lg q-mt-lg">
      <q-input
        :error="$v.thisLocation.title.$anyError"
        v-model.trim="$v.thisLocation.title.$model"
        class="input-large"
        label="place name"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-rename-box" />
        </template>
      </q-input>

      <q-select class="input-large" label="place type" :options="placeTypes" v-model="placeType">
        <template v-slot:prepend>
          <q-icon
            color="primary"
            class="input-icon-large self-end q-pb-md"
            name="mdi-format-list-bulleted-type"
          />
        </template>
      </q-select>

      <q-input
        :error="$v.addressStreet.$anyError"
        v-model.trim="$v.addressStreet.$model"
        class="input-large q-mt-lg"
        label="address"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-map-marker" />
        </template>
      </q-input>

      <div class="row justify-end">
        <address-builder class="col" v-model="addressJson" :location-id="locationId"/>
      </div>

      <div class="q-mt-xl">
        <q-btn color="primary" icon="save" label="save" @click="saveChanges()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import AddressBuilder from '../../../../components/AddressBuilder'

export default {
  name: 'MyLocationDetails',
  props: ['locationId'],
  data () {
    return {
      thisLocation: {},
      addressStreet: '',
      imgURL: '/statics/placeholders/place-placeholder-large.jpg',
      placeType: null,
      placeTypes: [
        'residential property',
        'commercial property',
        'mixed use property',
        'indoor growing facility',
        'outdoor growing facility',
        'mixed growing facility',
        'community garden',
        'farm',
        'urban farm',
        'campus',
        'country club',
        'golf course',
        'lab',
        'other'
      ],
      addressJson: ''
    }
  },
  components: { AddressBuilder },
  validations: {
    thisLocation: {
      title: { required }
    },
    addressStreet: { required },
    addressJson: { required }
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    location () {
      return this.$store.getters['locations/byId'](this.locationId)
    }
  },

  methods: {
    toTitleCase (str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    getCurrentLocationData () {
      this.thisLocation = Object.assign({}, this.location)
    },
    updateRouteMeta (m) {
      let meta = Object.assign(m, this.$route.meta)
      this.$root.$emit('update-route-meta', meta)
    },
    buildAddressJson () {
      this.addressJson.street = this.toTitleCase(this.addressStreet)
      this.thisLocation.address = this.addressJson
    },
    changePic () {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: 'Function to be implemented...'
      })
    },
    saveChanges () {
      this.$root.$emit('validate-country-specific-address')
      this.$nextTick(() => {
        this.$v.$touch()

        if (this.$v.$error) {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Please correct the errors above and try again'
          })
        } else {
          this.buildAddressJson()
          this.$api.patchLocation(this.me.id, this.locationId, this.thisLocation)
            .then(
              () => {
                this.$q.notify({
                  color: 'green-5',
                  textColor: 'white',
                  message: this.thisLocation.title + ' was successfully updated'
                })
              },
              () => {
                this.$q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'fas fa-exclamation-triangle',
                  message:
                    "Something went wrong. Don't worry, try submitting the form again. If the problem persists, please contact our customer service"
                })
              }
            )
        }
      })
    }
  },
  watch: {
    location () {
      this.addressStreet = this.location.address.street
      return this.getCurrentLocationData()
    }
  },
  created () {
    this.updateRouteMeta({
      backButtonPath: `/my/places/${this.locationId}`
    })
    if (this.location.address) this.addressStreet = this.location.address.street
    return this.getCurrentLocationData()
  }
}
</script>

<style lang="styl">
.input-large {
  font-size: 1.3rem;
}
</style>
