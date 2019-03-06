<template>
  <q-page padding>
    <q-input v-model.trim.number="inboxID" placeholder="Please enter an inbox ID.">
      <template v-slot:after>
          <q-btn round dense flat icon="arrow_forward" />
        </template>
    </q-input>
    <!-- content -->
  </q-page>
</template>

<script>
export default {
  name: 'Inbox'
}
</script>

<style>
</style>
