<template>
  <div v-if="hasPerm('can_edit_users')" class="q-pa-md new-user-form">
    <h5>Add User</h5>

    <q-input
      :error="$v.newUser.email.$anyError"
      v-model.trim="$v.newUser.email.$model"
      label="Email"
    >
      <template v-slot:prepend>
        <q-icon color="primary" name="mdi-email"/>
      </template>
    </q-input>

    <q-input
      :error="$v.newUser.password.$anyError"
      type="password"
      v-model.trim="$v.newUser.password.$model"
      label="Password"
    >
      <template v-slot:prepend>
        <q-icon color="primary" name="mdi-lock"/>
      </template>
    </q-input>

    <div class="q-gutter-md row items-start">
      <q-input class="col" v-model="newUser.fname" label="First Name"/>

      <q-input class="col" v-model="newUser.lname" label="Last Name"/>
    </div>

    <div class="q-pt-lg">
      <q-btn color="primary" icon="mdi-plus" @click="createUser" label="Create"/>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    newUser: {
      email: '',
      password: '',
      fname: '',
      lname: ''
    }
  }),

  validations: {
    newUser: {
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    createUser () {
      this.$v.newUser.$touch()

      if (this.$v.newUser.$error) {
        return
      }

      let data = Object.assign({}, this.newUser)
      this.$store.dispatch('users/create', { data }).then(
        () => {
          this.$v.newUser.$reset()
          this.newUser = {}
          this.$router.push({ path: '/' })
        },
        () => {
          this.$q.notify({
            message: 'Something went wrong',
            position: 'bottom-right'
          })
        }
      )
    },
    hasPerm (perm) {
      return this.$store.getters['auth/hasPerm'](perm)
    }
  }
}
</script>

<style lang="styl">
  .new-user-form {
    flex: 1;
  }
</style>
