<template>
  <!--<div relative-position class="q-pa-sm" style="background-image: linear-gradient(#1d1846, #362c89); height: 100vh">-->
  <div>
    <div class="signup-form">
      <!-- <q-card class="signup-layout no-shadow"> -->
        <q-card-section class="q-mb-lg">
          <div v-if="!isSignedUp" class="text-h4 flex flex-center text-white">Welcome to Dijoca!</div>
          <div v-else class="text-h4 flex flex-center text-white">Success!</div>
        </q-card-section>
        <q-card-section>
          <div v-if="!isSignedUp" class="flex flex-center text-white">Tell us a bit about yourself:</div>
          <div v-else class="flex flex-center text-white">
            You are welcome to login now and use your account.
            <br />
            <br />Meanwhile, please check your inbox for a confirmation email, and follow instructions in this email to complete registration.
          </div>
        </q-card-section>
        <q-card-section v-if="!isSignedUp">
          <q-input
            :error="$v.newUser.fname.$anyError"
            v-model.trim="$v.newUser.fname.$model"
            label="first name"
            placeholder
            color="cyan-6"
            input-class="text-white"
            dark
            v-on:keyup.enter="onSubmit"
          />
          <q-input
            :error="$v.newUser.lname.$anyError"
            v-model.trim="$v.newUser.lname.$model"
            label="last name"
            placeholder
            color="cyan-6"
            input-class="text-white"
            dark
            v-on:keyup.enter="onSubmit"
          />
          <q-input
            :error="$v.newUser.liame.$anyError"
            v-model.trim="$v.newUser.liame.$model"
            label="email"
            placeholder
            color="cyan-6"
            input-class="text-white"
            dark
            v-on:keyup.enter="onSubmit"
          />
          <input type="email" class="email-input-field" v-model.trim="newUser.email" />
        </q-card-section>
        <div class="flex flex-center text-white">Let's pick a really strong password:</div>
        <q-card-section v-if="!isSignedUp">
          <new-password v-model="newUser.password" show-lock="false" dark input-class="text-white" />
        </q-card-section>

        <q-card-actions v-if="!isSignedUp" class="q-mt-md" vertical>
          <q-btn color="primary" @click="onSubmit" label="SIGN UP" />
        </q-card-actions>
        <q-card-section v-if="!isSignedUp">
          <router-link class="links" :to="'/login'">
            <q-icon name="mdi-arrow-left" style="font-size: 2em;" />&nbsp;
            <span style="font-size: 1.2em;">back to login</span>
          </router-link>
        </q-card-section>
        <q-card-section v-else class="q-mt-md">
          <router-link class="links" style="float: right" :to="'/login'">
            <span style="font-size: 1.2em;">proceed to login</span>&nbsp;
            <q-icon name="mdi-arrow-right" style="font-size: 2em;" />
          </router-link>
        </q-card-section>
      <!-- </q-card> -->
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import NewPassword from '../../components/NewPassword'

export default {
  name: 'SignupPage',
  data () {
    return {
      newUser: {
        email: '',
        liame: '',
        password: '',
        fname: '',
        lname: ''
      },
      isSignedUp: false
    }
  },
  components: { NewPassword },
  validations: {
    newUser: {
      fname: { required },
      lname: { required },
      liame: { required, email }
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$error || this.newUser.password === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the errors above and try again'
        })
      } else {
        this.createUser()
        window.scrollTo(0, 0)
      }
    },
    createUser () {
      let data = Object.assign({}, this.newUser)
      this.$api.signup(data).then(
        () => {
          this.$v.newUser.$reset()
          this.newUser = {}
          this.isSignedUp = true
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
  }
}
</script>

<style scoped lang="styl">
.logo-container {
  margin-bottom: 2rem;
}
.signup-form {
  width: 330px;
  margin: 0 auto;
}
.signup-layout {
  background-color: #159789;
}
.links {
  color: white;
  text-decoration: none;
}
.email-input-field {
  display: none;
}
</style>
