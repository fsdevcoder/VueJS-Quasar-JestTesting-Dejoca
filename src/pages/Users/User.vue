<template>
  <q-page padding>
    <h4>
      {{ user.fname }} {{ user.lname }}
      <q-btn class="on-right" round flat icon="mdi-pencil" @click="editUser()"/>
    </h4>
    <div>
      <span class="q-caption text-light">{{ user.id }}</span>
    </div>

    <template v-if="user.is_confirmed">
      <q-icon name="mdi-check-circle" color="positive"/>
      {{ user.email }}
    </template>
    <template v-else>
      <q-icon name="mdi-alert-circle" color="negative"/>
      {{ user.email }}
      <a href="#" class="text-light on-right">resend confirmation email</a>
    </template>

    <div v-if="editMode">
      <h5>User Info</h5>

      <div class="q-gutter-md row items-start">
        <q-input class="col" v-model="user.fname" label="First Name"/>

        <q-input class="col" v-model="user.lname" label="Last Name"/>
      </div>

      <q-input type="password" v-model="user.password" label="Password">
        <template v-slot:prepend>
          <q-icon color="primary" name="mdi-lock"/>
        </template>
      </q-input>
      <q-input v-model="user.avatar" label="Avatar">
        <template v-slot:prepend>
          <q-icon color="secondary" name="mdi-account-box-outline"/>
        </template>
      </q-input>
      <q-input v-model="user.notes" type="textarea" label="Notes" :max-height="100" rows="7">
        <template v-slot:prepend>
          <q-icon color="secondary" name="mdi-text"/>
        </template>
      </q-input>

      <div class="q-pt-sm">
        <h5>Permissions</h5>
        <q-field borderless>
          <template v-slot:prepend>
            <q-icon color="positive" name="shield"/>
          </template>

          <q-option-group
            type="toggle"
            color="secondary"
            v-model="user.perms"
            :options="permsAsOptions"
          />
        </q-field>
      </div>

      <div class="q-pt-lg">
        <q-btn color="primary" icon="save" @click="saveUser" label="save"/>
        <q-btn color="negative" icon="delete" @click="destroyUser" class="on-right" label="delete"/>
      </div>
    </div>

    <div v-else>
      <h5>Notes</h5>
      <p>{{ user.notes }}</p>

      <h5>Locations</h5>
      <router-link
        v-for="p in user.locations"
        :to="`/locations/${p}`"
        :key="`location-link-id-${p}`"
      >{{ getLocationTitle(p) }}</router-link>

      <h5>Permissions</h5>
      <template v-for="(p, k) in user.perms">
        <span :key="k">{{ permissions[p] }}</span>
        <br :key="`perm-item-${k}`">
      </template>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'User',
  props: ['userId'],
  data: () => ({
    editMode: false
  }),

  computed: {
    permissions () {
      return this.$store.getters['auth/permissions']
    },
    permsAsOptions () {
      let perms = this.permissions

      return Object.keys(perms).map(k => {
        return {
          label: perms[k],
          value: k
        }
      })
    },
    user () {
      return this.$store.getters['users/byId'](this.userId)
    }
  },

  methods: {
    getLocationTitle (id) {
      return this.$store.getters['locations/byId'](id).title || id
    },
    saveUser () {
      this.$store.dispatch('users/update', {
        userId: this.userId
      })
    },
    destroyUser () {
      this.$store
        .dispatch('users/destroy', {
          userId: this.userId
        })
        .then(() => {
          this.$router.push({ path: `/users` })
        })
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    },
    editUser () {
      if (this.hasPerm('can_edit_users')) {
        this.editMode = !this.editMode
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Sorry, you need permissions to edit users'
        })
      }
    }
  },

  created () {
    this.$store.dispatch('users/loadUser', {
      userId: this.userId
    })
    this.$store.dispatch('locations/loadLocations', this.userId)
  }
}
</script>
