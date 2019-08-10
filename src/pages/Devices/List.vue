<template>
  <q-page class="flex">
    <q-table
      title="Smart Hubs"
      :data="devices"
      :columns="columns"
      row-key="id"
      color="secondary"
      :pagination.sync="pagination"
    >
      <template slot="top-left" slot-scope="props">
        <q-btn color="primary" flat icon="mdi-plus" class="q-mr-sm" @click.native="addDevice()" />
      </template>

      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="selectDevice(props.row)"
        class="cursor-pointer"
      >
        <q-td key="Title" :props="props">{{ props.row.title }}</q-td>
        <q-td key="Location" :props="props">
          <router-link
            :to="`/locations/${props.row.location_id}`"
            @click.native="$event.stopImmediatePropagation()"
          >{{ getLocationTitle(props.row.location_id) }}</router-link>
        </q-td>
        <q-td key="Status" :props="props">
          <q-icon v-if="!props.row.status" color="negative" name="mdi-lan-disconnect" />
          <q-icon v-else-if="!props.row.mcu_status" color="warning" name="mdi-lan-pending" />
          <q-icon v-else color="positive" name="mdi-lan-connect" />
        </q-td>
      </q-tr>
    </q-table>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'DevicesList',
  props: ['locationId', 'currentUserScoped'],
  data: () => ({
    pagination: {
      sortBy: null, // String, column "name" property value
      descending: false,
      page: 1,
      rowsPerPage: 0 // current rows per page being displayed
    }
  }),

  computed: {
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
          name: 'Location',
          required: true,
          label: 'Location',
          align: 'left',
          field: 'location_id',
          sortable: true
        },
        {
          name: 'Status',
          required: true,
          label: 'Status',
          align: 'center',
          field: 'status',
          sortable: true
        }
      ]

      return columns
    },

    devices () {
      return this.locationId
        ? this.$store.getters['devices/byLocationId'](this.locationId)
        : this.$store.getters['devices/all']
    },

    scope () {
      return `${this.currentUserScoped ? '/my' : ''}${
        this.locationId ? `/locations/${this.locationId}` : ''
      }`
    }
  },

  methods: {
    getLocationTitle (id) {
      return this.$store.getters['locations/byId'](id).title || id
    },
    createDevice () {
      let data = {
        title: 'New Device'
      }
      this.$store.dispatch('devices/create', { data })
    },
    selectDevice (device) {
      this.$router.push({ path: `${this.scope}/devices/${device.id}` })
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    addDevice () {
      if (this.hasPerm('can_edit_devices')) {
        this.createDevice()
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permissions to add devices'
        })
      }
    }
  },
  created () {
    let userId = this.currentUserScoped ? this.me.id : null
    this.$store.dispatch('devices/loadDevices', {
      userId: userId,
      locationId: this.locationId
    })
    this.$store.dispatch('locations/loadLocations', userId)
  }
}
</script>
