<template>
  <div class="chatMenu row"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      existingConversations: []
    }
  },
  computed: {
    ...mapState({})
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.chatMenu {
  width: 40%;
  margin-right: 20px;

  .col {
    width: 300px;
  }
}
</style>
