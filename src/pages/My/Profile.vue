<template>
  <q-page padding>
    <div>
      <q-avatar size="200px" class="q-ma-xl">
        <img v-if="thisUser.avatar!=null" :src="thisUser.avatar">
        <v-gravatar :size="200" v-else :email="thisUser.email" default-img="mp" />
      </q-avatar>
    </div>
    <div>
      <q-input
        :error="$v.thisUser.fname.$anyError"
        v-model.trim="thisUser.fname"
        class="input-large"
        label="first name"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-account"/>
        </template>
      </q-input>
      <q-input
        :error="$v.thisUser.lname.$anyError"
        v-model.trim="thisUser.lname"
        class="input-large"
        label="last name"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-account-multiple"/>
        </template>
      </q-input>
      <q-input
        :error="$v.thisUser.email.$anyError"
        v-model.trim="thisUser.email"
        class="input-large"
        label="email"
      >
        <template v-slot:prepend>
          <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-email"/>
        </template>
      </q-input>
    </div>
    <div v-if="changePasswordMode">
      <new-password v-model="thisUser.password" show-lock="true" input-class="text-black" hints-class="text-red"/>
    </div>
    <div class="q-pt-lg">
      <q-btn color="primary" icon="save" label="save changes" @click="saveChanges()"/>
      <q-btn v-if="!changePasswordMode" color="accent" icon="mdi-lock" class="q-ml-sm" label="change password" @click="changePassword(true)"/>
      <q-btn v-if="changePasswordMode" color="red-4" icon="mdi-lock" class="q-ml-sm" label="cancel" @click="changePassword(false)"/>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Gravatar from 'vue-gravatar'
import NewPassword from '../../components/NewPassword'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'MySettings',
  components: { 'v-gravatar': Gravatar, NewPassword },
  data () {
    return {
      changePasswordMode: false,
      thisUser: {}
    }
  },
  validations: {
    thisUser: {
      fname: { required },
      lname: { required },
      email: { required, email }
    }
  },
  computed: {
    ...mapGetters({
      me: 'auth/currentUser'
    })
  },
  methods: {
    getCurrentUserData () {
      this.thisUser = Object.assign({}, this.me)
    },
    changePassword (mode) {
      this.changePasswordMode = mode
    },
    saveChanges () {
      this.$v.$touch()
      if (this.$v.$error || (this.changePasswordMode && this.thisUser.password === '')) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please correct the errors above and try again'
        })
      } else {
        this.changePasswordMode = false
        this.$store.dispatch('auth/updateCurrentUser', this.thisUser).then(
          () => {
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              message: 'Your information was successfully updated'
            })
          },
          () => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: 'Something went wrong. Don\'t worry, try submitting the form again. If the problem persists, please contact our customer service'
            })
          }
        )
      }
    }
  },
  watch: {
    me () { return this.getCurrentUserData() }
  },
  created () { return this.getCurrentUserData() }
}
</script>

<style lang="styl">
.input-large {
  font-size: 1.3rem;
}
.input-icon-large {
  font-size: 1.6rem;
}
.hints {
  max-width:400px;
  padding:0.5em;
  font-size: 1.1em;
  color: red;
  h2 {
    margin: .5em 0 .2em 0;
  }
  p {
    margin: 0;
    padding-left: 1em;
    &::before {
      content:"---";
      font-size:.4em;
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

body {
  background-color:white;
}

</style>
