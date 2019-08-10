<template>
  <div>
    <div class="confirmed">
      <!-- <q-card class="bg-cyan-10 no-shadow"> -->
        <q-card-section>
          <div
            v-if="confirmationStatus === 2"
            class="text-h4 flex flex-center text-white"
          >Confirmed!</div>
          <div
            v-else-if="confirmationStatus === 1"
            class="text-h4 flex flex-center text-white"
          >Confirmation failed</div>
          <div v-else class="text-h4 flex flex-center text-white">Conguratulations!</div>
        </q-card-section>
        <q-card-section>
          <div class="flex flex-center text-white">You can now login and use your account.</div>
        </q-card-section>
        <q-card-section class="q-mt-md">
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
export default {
  name: 'EmailConfirmation',
  data () {
    return {
      confirmationStatus: 0
    }
  },
  computed: {
    email () {
      return this.$route.query.email
    },
    token () {
      return this.$route.query.token
    }
  },
  created () {
    this.$api
      .confirmEmail({
        email: this.email,
        token: this.token
      })
      .then(
        () => (this.confirmationStatus = 2),
        () => (this.confirmationStatus = 1)
      )
  }
}
</script>

<style scoped lang="styl">
.logo-container {
  margin-bottom: 2rem;
}
.confirmed {
  width: 340px;
  margin: 0 auto;
}
.links {
  color: white;
  text-decoration: none;
}
</style>
