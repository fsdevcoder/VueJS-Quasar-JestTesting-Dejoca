<template>
  <!--<div relative-position class="q-pa-sm" style="background-image: linear-gradient(#1d1846, #362c89); height: 100vh">-->
  <div>
    <div class="login-form">
      <q-card-section class="q-mb-lg">
        <div class="text-h4 flex flex-center text-white">Welcome back!</div>
      </q-card-section>

      <q-card-section>
        <q-input
          :error="$v.email.$anyError"
          v-model.trim="$v.email.$model"
          label="email"
          placeholder=""
          color="cyan-6"
          input-class="text-white"
          dark
          v-on:keyup.enter="onSubmit"
        />
        <q-input
          :error="$v.password.$anyError"
          v-model.trim="$v.password.$model"
          :type="isPwd ? 'password' : 'text'"
          label="password"
          placeholder=""
          color="cyan-6"
          input-class="text-white"
          dark
          v-on:keyup.enter="onSubmit"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions vertical>
        <q-btn color="primary" @click="onSubmit" label="Login"/>
      </q-card-actions>
      <q-card-section>
        <!-- <router-link class="links" :to="'/sign-up'">sign up</!-->
        <router-link class="links" style="float:right" :to="'/forgot-password'">forgot password?</router-link>
      </q-card-section>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: null,
      password: null,
      isPwd: true
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) }
  },
  computed: {},
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Wrong or missing login credentials. Please correct and try again'
        })
      } else {
        this.$router.push({ path: '/dashboard' })
        // let creds = {
        //   email: this.email,
        //   password: this.password
        // }
        // this.$store.dispatch('auth/login', creds)
        //   .then(
        //     () => this.$router.push({ path: '/' }),
        //     () => {
        //       this.$q.notify({
        //         color: 'red-5',
        //         textColor: 'white',
        //         icon: 'fas fa-exclamation-triangle',
        //         message: 'Wrong login credentials. Please correct and try again'
        //       })
        //     })
      }
    }
  }
}
</script>

<style scoped lang="styl">
.logo-container {
  margin-bottom: 2rem;
}
.login-form {
  width: 330px;
  margin: 0 auto;
}
.links {
  color:white;
  text-decoration: none;
}
</style>
