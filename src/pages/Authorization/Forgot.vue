<template>
  <!--<div relative-position class="q-pa-sm" style="background-image: linear-gradient(#1d1846, #362c89); height: 100vh">-->
  <div>
    <div class="forgot-password-form">
      <q-card-section>
        <div v-if="!isResend" class="text-h4 flex flex-center text-white">Forgot Password</div>
        <div v-else class="text-h4 flex flex-center text-white">Done!</div>
      </q-card-section>
      <q-card-section>
        <div v-if="!isResend" class="flex flex-center text-white">No worries. Let's reset it:</div>
        <div v-else class="flex flex-center text-white">
          An email with password recovery instructions was just sent to your email address.
          <br />
          <br />If you don't see it within the next few minutes, check your junk box, and if it's not there either then use the Resend Email button below:
        </div>
      </q-card-section>
      <q-card-section v-if="!isResend">
        <q-input
          :error="$v.email.$anyError"
          v-model.trim="$v.email.$model"
          label="email"
          placeholder
          color="cyan-6"
          input-class="text-white"
          dark
          v-on:keyup.enter="onSubmit"
        />
      </q-card-section>

      <q-card-actions vertical>
        <q-btn
          v-if="timeout"
          color="primary"
          @click="onSubmit"
          :label="`Try after ${timeout} seconds`"
        />
        <q-btn v-else-if="isResend" color="primary" @click="onSubmit" label="Resend Email" />
        <q-btn v-else color="primary" @click="onSubmit" label="Reset Password" />
      </q-card-actions>
      <q-card-section>
        <router-link class="links" :to="'/login'">
          <q-icon name="mdi-arrow-left" style="font-size: 2em;" />&nbsp;
          <span style="font-size: 1.2em;">back to login</span>
        </router-link>
      </q-card-section>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ForgotPasswordPage',
  data () {
    return {
      timeoutCounterRef: null,
      email: null,
      timeout: null,
      isResend: false
    }
  },
  validations: {
    email: { required, email }
  },
  methods: {
    stopTimeoutCounter () {
      if (this.timeoutCounterRef) {
        clearInterval(this.timeoutCounterRef)
        this.timeoutCounterRef = null
      }
    },
    startTimeoutCounter () {
      this.timeoutCounterRef = setInterval(() => {
        this.timeout--
        if (this.timeout === 0) {
          this.stopTimeoutCounter()
          this.timeout = null
        }
      }, 1000)
    },
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the entered email and try again'
        })
      } else {
        this.$api.resetPassword({ email: this.email }).then(
          response => {
            this.stopTimeoutCounter()
            if (response.data.success) {
              this.$q.notify({
                color: 'green-6',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Please check your inbox for further instructions.'
              })
              this.isResend = true
            } else if (response.data.timeout) {
              this.timeout = parseInt(response.data.timeout)
              this.startTimeoutCounter()
            }
          },
          response => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: 'Something went wrong. Please try again later'
            })
          }
        )
      }

      // if (!this.isResend) {
      //   this.$v.$touch()
      //   if (this.$v.$error) {

      //   } else {
      //     this.$q.notify({
      //       color: 'green-6',
      //       textColor: 'white',
      //       icon: 'fas fa-check-circle',
      //       message: 'Please check your inbox for further instructions.'
      //     })
      //     this.isResend = true
      //   }
      // } else {
      //   this.$q.notify({
      //     color: 'green-6',
      //     textColor: 'white',
      //     icon: 'fas fa-check-circle',
      //     message: 'Password recovery email resent.'
      //   })
      // }
    }
  }
}
</script>

<style scoped lang="styl">
.logo-container {
  margin-bottom: 2rem;
}
.forgot-password-form {
  width: 330px;
  margin: 0 auto;
}
.links {
  color: white;
  text-decoration: none;
}
</style>
