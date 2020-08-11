<template>
  <div class="group col">
    <div class="row">
      <h3>
        {{ group.name }}
      </h3>
      <div class="settings" v-if="isAdmin">settings</div>
    </div>
    <div class="group__content">
      <div class="posts">
        <app-post v-for="post in posts" :key="post.id" :post="post"></app-post>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    page: 0
  }),
  computed: {
    ...mapState({
      userId: state => state.user.id
    }),
    group() {
      return this.$store.getters['user/getGroup'](this.id).group
    },
    posts() {
      return this.$store.getters['user/getGroup'](this.id).posts
    },
    isAdmin() {
      return (
        this.$store.getters['user/getGroup'](this.id).group.creatorId ===
        this.userId
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  overflow: auto;
}
</style>
