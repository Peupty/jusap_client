<template>
  <!-- <form @submit.prevent="sendMessage">
    <input type="text" v-model="msg" />
    <button type="submit">send</button>
  </form> -->
  <main class="col">
    <app-chat
      v-for="chat in groups"
      :key="chat.group.id"
      :chat="chat.group"
      :participantId="chat.participantId"
    ></app-chat>
  </main>
</template>

<script>
import appChat from '@/components/chat.vue'
import { mapState } from 'vuex'

export default {
  components: {
    appChat
  },
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapState({
      groups: state => state.user.groups
    })
  },
  methods: {}
}
</script>

<style></style>
