<template>
  <q-page class="flex">
    <q-table
      title="Locations"
      :data="locations"
      :columns="columns"
      row-key="id"
      color="secondary"
    >
      <template slot="top-left" slot-scope="props">
        <q-btn color="primary" flat icon="mdi-plus" class="q-mr-sm" @click.native="addLocation()"/>
      </template>

      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="selectLocation(props.row)"
        class="cursor-pointer"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Locations',
  props: ['currentUserScoped'],
  data: () => ({}),

  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    columns () {
      let columns = [
        {
          name: 'Title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true
        },
        {
          name: 'Users',
          required: true,
          label: 'Users',
          align: 'left',
          field: row => row.users.length,
          sortable: true
        }
      ]

      if (this.currentUserScoped) {
        // columns.push()
      } else {
        columns.push({
          name: 'Owner',
          required: true,
          label: 'Owner',
          align: 'left',
          field: row => this.getUserName(row.owner_user_id),
          sortable: true
        })
      }

      return columns
    },
    locations () {
      if (this.currentUserScoped) {
        return this.$store.getters['locations/my']
      } else {
        return this.$store.getters['locations/all']
      }
    }
  },

  methods: {
    getUserName (id) {
      let user = this.$store.getters['users/byId'](id)
      if (user) {
        return `${user.fname} ${user.lname}`
      } else {
        return id
      }
    },
    createLocation () {
      let userId = this.currentUserScoped ? this.me.id : null
      let data = {
        title: 'New Location'
      }
      this.$store.dispatch('locations/create', { userId, data })
    },
    selectLocation (location) {
      let scope = this.currentUserScoped ? '/my' : ''
      this.$router.push({ path: `${scope}/locations/${location.id}` })
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    addLocation () {
      if (this.hasPerm('can_edit_locations')) {
        this.createLocation()
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permission to add locations'
        })
      }
    }
  },

  mounted () {
    if (this.currentUserScoped) {
      if (this.me) this.$store.dispatch('locations/loadLocations', this.me.id)
    } else {
      this.$store.dispatch('users/loadUsers')
      this.$store.dispatch('locations/loadLocations', null)
    }
  }
}
</script>
