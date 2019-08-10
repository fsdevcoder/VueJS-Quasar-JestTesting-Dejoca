<template>
  <div>
    <q-input
      :class="{valid:passwordValidation.valid}"
      class="input-large"
      :error="$v.password.$anyError"
      v-model.trim="$v.password.$model"
      :type="isPwd ? 'password' : 'text'"
      label="password"
      placeholder=""
      color="cyan-6"
      :dark="dark"
      :input-class="inputClass"
    >
      <template v-if="showLock=='true'" v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-lock"/>
      </template>
      <template v-slot:append>
        <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      class="input-large"
      :error="$v.checkPassword.$anyError"
      v-model.trim="$v.checkPassword.$model"
      :type="isPwdConf ? 'password' : 'text'"
      label="confirm password"
      placeholder=""
      color="cyan-6"
      :dark="dark"
      :input-class="inputClass"
    >
      <template v-if="showLock=='true'" v-slot:prepend>
        <q-icon color="primary" class="input-icon-large self-end q-pb-md" name="mdi-lock"/>
      </template>
      <template v-slot:append>
        <q-icon
          :name="isPwdConf ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwdConf = !isPwdConf"
        />
      </template>
    </q-input>
    <transition name="hint" appear>
      <div v-if='passwordValidation.errors.length > 0 || notSamePasswords' :class="`hints ${hintsClass}`">
        <p v-for='error in passwordValidation.errors' v-bind:key='error'>{{error}}</p>
        <p v-if='notSamePasswords'>Both fields must match.</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'NewPassword',
  data () {
    return {
      rules: [
        { message: '10 characters minimum.', regex: /.{10,}/ },
        { message: 'One lowercase letter required.', regex: /[a-z]+/ },
        { message: 'One uppercase letter required.', regex: /[A-Z]+/ },
        { message: 'One number required.', regex: /[0-9]+/ },
        { message: 'One special character required.', regex: /[!@#$%^&]+/ }
      ],
      password: '',
      checkPassword: '',
      isPwd: true,
      isPwdConf: true
    }
  },
  props: ['showLock', 'dark', 'inputClass', 'hintsClass'],
  validations: {
    password: { required },
    checkPassword: { required }
  },
  computed: {
    notSamePasswords () {
      return (this.password !== this.checkPassword)
    },
    passwordsFilled () {
      return (this.password !== '' && this.checkPassword !== '')
    },
    passwordValidation () {
      let errors = []
      for (let condition of this.rules) {
        if (!condition.regex.test(this.password)) {
          errors.push(condition.message)
        }
      }
      if (errors.length === 0 && !this.notSamePasswords) {
        this.$emit('input', this.password)
        return { valid: true, errors }
      } else {
        this.$emit('input', '')
        return { valid: false, errors }
      }
    }
  }
}
</script>

<style scoped lang="styl">
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
