<template>
  <q-page class="flex flex-center">
      <q-list>
        <q-separator />
        <q-item clickable tag="a" :to="'/login'">
          <q-item-section>
            <q-item-label>login</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable tag="a" :to="'/sign-up'">
          <q-item-section>
            <q-item-label>sign-up</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable tag="a" :to="'/forgot-password'">
          <q-item-section>
            <q-item-label>forgot-password</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable tag="a" :to="'/password-recovery'">
          <q-item-section>
            <q-item-label>password-recovery</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable tag="a" :to="'/email-confirmation'">
          <q-item-section>
            <q-item-label>email-confirmation</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </q-list>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
