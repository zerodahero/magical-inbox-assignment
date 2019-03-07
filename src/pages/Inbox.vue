<template>
  <q-page padding>
    <form @submit.prevent="loadInbox">
      <q-input v-model.trim.number="inboxId" placeholder="Please enter an inbox ID.">
        <template v-slot:after>
            <q-btn round dense flat type="submit" icon="arrow_forward" />
          </template>
      </q-input>
    </form>

    <div v-if="Object.entries(inboxData).length > 0 && inboxData.constructor === Object" class="q-pa-md">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>
          Inbox {{ inboxData.inboxAlias }}
          <span class="text-caption" style="display:block;">{{ inboxData.inboxId }} </span>
        </q-toolbar-title>
      </q-toolbar>

      <q-list bordered separator padding>
        <inbox-message-list-item v-for="(message, messageID) in inboxData.messages" :key="messageID" :message="message" />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import jwtDecode from 'jwt-decode'

import InboxMessageListItem from 'components/InboxMessageListItem'

export default {
  name: 'Inbox',
  data () {
    return {
      inboxId: this.id,
      inboxData: {}
    }
  },
  components: {
    InboxMessageListItem
  },
  created () {
    // If we hit this page with the prop, load the inbox
    // NOTE: nothing currently changes the url param, so this is a bit misleading...
    if (this.id) {
      this.loadInbox()
    }
  },
  watch: {
    inboxId () {

    }
  },
  props: {
    id: {
      required: false,
      type: Number,
      default: null
    }
  },
  methods: {
    /**
     * Loads the inbox from the component's inboxid field
     */
    loadInbox () {
      if (!this.inboxId) {
        return false
      }

      if (!this.validateId(this.inboxId)) {
        console.error('The inbox ID is invalid')
        this.$q.notify({
          color: 'red',
          message: 'The inbox ID is invalid! Please check the ID and try again.'
        })
        return false
      }

      this.$q.loading.show()

      this.$axios.get(`https://coding-assignment-v1.now.sh/api/v1/inbox/${this.inboxId}`).then((response) => {
        this.inboxData = jwtDecode(response.data.payload)
        // NOTE: there should definitely be some data checking right here...
      }).catch((error) => {
        console.error(error)
      }).then(() => {
        this.$q.loading.hide()
      })
    },
    /**
     * Validates a given ID
     */
    validateId (id) {
      return /^\d{6}$/.test(id)
    }
  }
}
</script>

<style>
</style>
