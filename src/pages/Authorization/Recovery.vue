<template>
  <div>
    <div class="recovery-form">
      <!-- <q-card class="bg-cyan-10 no-shadow"> -->

        <!--  -->
        <template v-if="loggedInWithToken && !isDone">
          <q-card-section class="q-mb-lg">
            <div class="text-h4 flex flex-center text-white">Password Recovery</div>
          </q-card-section>

          <q-card-section>
            <div class="flex flex-center text-white">Let's pick a really strong password:</div>
          </q-card-section>

          <q-card-section>
            <new-password v-model="User.password" show-lock="false" dark="true" input-class="text-white"/>
          </q-card-section>

          <q-card-actions class="q-mt-md" vertical>
            <q-btn color="primary" @click="onSubmit" label="Save Password"/>
          </q-card-actions>
        </template>

        <!--  -->
        <template v-else-if="loggedInWithToken && isDone" >
          <q-card-section class="q-mb-lg">
            <div class="text-h4 flex flex-center text-white">Password Recovery</div>
          </q-card-section>

          <div class="flex flex-center text-white">
            You are welcome to login now and use your account.
          </div>

          <q-card-section class="q-mt-md">
            <router-link class="links" style="float: right" :to="'/login'">
              <span style="font-size: 1.2em;">proceed to login</span>&nbsp;
              <q-icon name="mdi-arrow-right" style="font-size: 2em;" />
            </router-link>
          </q-card-section>
        </template>

        <!--  -->
        <template v-else>
          <q-card-section class="q-mb-lg">
            <div class="text-h4 flex flex-center text-white">Invalid token</div>
          </q-card-section>

          <q-card-section>
            <div class="flex flex-center text-white">
              Your token is invalid or expired. Please try again.
            </div>
          </q-card-section>

          <q-card-section class="q-mt-md">
            <router-link class="links" style="float: right" :to="'/forgot-password'">
              <span style="font-size: 1.2em;">proceed to password recovery</span>&nbsp;
              <q-icon name="mdi-arrow-right" style="font-size: 2em;" />
            </router-link>
          </q-card-section>
        </template>

      <!-- </q-card> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewPassword from '../../components/NewPassword'

export default {
  name: 'PasswordRecoveryPage',
  data () {
    return {
      User: {
        password: ''
      },
      loggedInWithToken: false,
      isDone: false
    }
  },
  components: { NewPassword },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    }),
    email () {
      return this.$route.query.email
    },
    token () {
      return this.$route.query.token
    }
  },
  methods: {
    onSubmit () {
      if (this.User.password === '') {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the errors above and try again'
        })
      } else {
        this.$store.dispatch('auth/updateCurrentUser', {
          password: this.User.password
        }).then(
          () => {
            this.isDone = true
            window.scrollTo(0, 0)
          }
        )
      }
    }
  },

  created () {
    let creds = {
      email: this.email,
      token: this.token
    }
    this.$store.dispatch('auth/login', creds).then(
      () => {
        this.loggedInWithToken = true
      },
      () => {}
    )
  }
}
</script>

<style scoped lang="styl">
.logo-container {
  margin-bottom: 2rem;
}
.recovery-form {
  width: 340px;
  margin: 0 auto;
}
.links {
  color:white;
  text-decoration: none;
}
.hints {
  max-width:400px;
  padding:1em;
  font-size: 1.1em;
  color: #EF9FAC;
  h2 {
    margin: .5em 0 .2em 0;
  }
  p {
    margin: 0;
    padding-left:1em;
    &::before {
      content:"-";
      font-size:.9em;
      margin-right:6px;
      display:inline-block;
    }
  }
}
.hint {
  &-enter {
    opacity:0;
    transform:translate3d(-20px,0,0);
    }
  &-leave-to {
    opacity:0;
    transform:translate3d(0, 20px, 0);
  }
  &-enter-active {
    transition:300ms;
  }
  &-leave-active {
    transition:400ms;
  }
}

</style>
