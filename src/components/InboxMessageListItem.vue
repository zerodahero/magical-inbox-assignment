<template>
  <q-item >
    <q-item-section>
      <q-item-label>{{ message.messageSubject }}</q-item-label>
      <q-item-label caption lines="2">{{ message.messageContent }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ message.messageAt | dateFilter }}</q-item-label>
      <q-item-label class="text-caption">From {{ message.messageSender }}</q-item-label>
      <q-item-label><q-badge dense :text-color="priority.textColor" :color="priority.color">{{ priority.text }}</q-badge></q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { date } from 'quasar'

// NOTE: This would probably be best in a config of some sort, but this will do fine for now
let priorityMap = {
  0: {
    text: 'Low',
    color: 'grey',
    textColor: 'white'
  },
  1: {
    text: 'Medium',
    color: 'yellow',
    textColor: 'black'
  },
  2: {
    text: 'High',
    color: 'orange',
    textColor: 'white'
  },
  3: {
    text: 'Urgent',
    color: 'red',
    textColor: 'white'
  }
}

export default {
  name: 'InboxMessageListItem',
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  data () {
    return {}
  },
  filters: {
    dateFilter (value) {
      return date.formatDate(value, 'ddd MMM Do, YYYY, h:mma')
    }
  },
  computed: {
    priority () {
      if (!priorityMap[this.message.messagePriority]) {
        console.error('Unknown priority!', this.message.messagePriority)
        // NOTE: this default would probably also be best in a config (not here)
        return {
          text: '',
          color: '',
          textColor: ''
        }
      }
      return priorityMap[this.message.messagePriority]
    }
  }
}
</script>

<style>
</style>
