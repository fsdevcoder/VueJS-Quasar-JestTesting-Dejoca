<template>
  <q-page class="flex">
    <q-table
      title="Available Software"
      :data="software"
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
  name: 'DeviceSoftware',
  props: ['modelId'],
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

    software () {
      // return this.modelId
      //   ? this.$store.getters['deviceSoftware/byModelId'](this.modelId)
      //   : this.$store.getters['deviceSoftware/all']
      return this.$store.getters['deviceSoftware/all']
    }
  },

  methods: {
    selectSoftware (sw) {
      this.$router.push({
        path: `${this.scope}/device-software/${sw.id}`
      })
    }
  },

  created () {
    this.$store.dispatch('deviceSoftware/loadDeviceSoftwares', {
      modelId: this.modelId
    })
  }
}
</script>
