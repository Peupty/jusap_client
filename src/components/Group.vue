<template>
  <div class="group col">
    <div class="row">
      <h3>
        {{ group.name }}
      </h3>
      <div class="settings" v-if="isAdmin">settings</div>
    </div>
    <form @submit.prevent="addPost" class="row">
      <input type="text" v-model="post.content" />
      <button type="submit">add post</button>
    </form>
    <section class="group__content">
      <div class="posts">
        <app-post v-for="post in posts" :key="post.id" :post="post"></app-post>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      page: 0,
      post: null
    }
  },
  computed: {
    group() {
      return this.$store.getters['user/getGroup'](this.id).group
    },
    posts() {
      return this.$store.getters['user/getGroup'](this.id).posts
    },
    participantId() {
      return this.$store.getters['user/getGroup'](this.id).participantId
    },
    isAdmin() {
      return (
        this.$store.getters['user/getGroup'](this.id).group.creatorId ===
        this.participantId
      )
    }
  },
  created() {
    this.post = this.createNewPost()
  },
  methods: {
    async addPost() {
      try {
        await this.$http.group.addPost(this.post)
      } catch (error) {
        console.log(error)
      }
    },
    createNewPost() {
      return {
        groupId: this.id,
        participantId: this.participantId,
        content: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  overflow: hidden;
  height: 100%;
  padding-bottom: 20px;

  &__content {
    height: 100%;
    overflow: auto;
  }
}
</style>
