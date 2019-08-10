<template>
  <q-page class="flex">
    <q-table
      title="Users"
      :data="users"
      :columns="columns"
      row-key="id"
      color="secondary"
      :pagination.sync="pagination"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        :props="props"
        @click.native="selectUser(props.row)"
        class="cursor-pointer"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <q-avatar>
            <img v-bind:src="props.row.avatar || avatar">
          </q-avatar>
          {{ col.value }}
          <span>
             <q-icon v-if="props.row.is_confirmed" class="text-red" name="email"/>
          <q-icon v-else class="text-green" name="email"/> {{props.row.email}}
          </span>
        </q-td>
      </q-tr>
    </q-table>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click.native="addUser()"/>
    </q-page-sticky>
  </q-page>
</template>

<script>

export default {
  name: 'Users',
  data: () => ({
    avatar: '//www.gravatar.com/avatar/a67dfbfd65826941d6b6570de13272f3?s=80&d=mp&r=g',
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
          name: 'Name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row =>
            row.fname || row.lname ? `${row.fname} ${row.lname}` : row.id,
          sortable: true
        }
      ]

      return columns
    },
    users () {
      return this.$store.getters['users/all']
    }
  },

  methods: {
    selectUser (user) {
      this.$router.push({ path: `/users/${user.id}` })
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    addUser () {
      if (this.hasPerm('can_edit_users')) {
        this.$router.push({ path: '/users/add-user' })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permission to add users'
        })
      }
    }
  },

  created () {
    this.$store.dispatch('users/loadUsers', {})
  }
}
</script>

<style lang="styl">

</style>
