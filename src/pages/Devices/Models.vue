<template>
  <q-page class="flex">
    <q-table
      title="Available Device Models"
      :data="models"
      :columns="columns"
      row-key="id"
      color="secondary"
      :pagination.sync="pagination"
    ></q-table>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'DeviceModels',
  // props: ['modelId'],
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
          name: 'Id',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'id'
        },
        {
          name: 'Version',
          required: true,
          label: 'Version',
          align: 'left',
          field: 'version',
          sortable: true
        }
      ]

      return columns
    },

    models () {
      return this.$store.getters['deviceModels/all']
    }
  },

  methods: {
    selectDeviceType (m) {
      this.$router.push({
        path: `${this.scope}/device-models/${m.id}`
      })
    }
  },

  created () {
    this.$store.dispatch('deviceModels/loadDeviceModels')
  }
}
</script>
