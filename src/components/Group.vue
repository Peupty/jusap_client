<template>
  <div class="group" :style="{ background: group.color }">
    <div class="group__toolbar py-2 px-2">
      <div class="group__info">
        <b-avatar class="mr-2"></b-avatar>
        <h5 class="my-auto">{{ user.nickname }}</h5>
        <b-avatar class="mx-2"></b-avatar>
        <h5 class="my-auto">{{ group.name }}</h5>
      </div>
      <b-button-group>
        <b-button
          variant="primary"
          class="settings"
          v-if="isAdmin"
          @click.prevent="openSettings(group)"
        >
          settings
        </b-button>
        <b-button variant="primary" @click.prevent="refresh">refresh</b-button>
      </b-button-group>
    </div>
    <form @submit.prevent="addPost" class="mt-2 mx-3">
      <b-input-group>
        <b-input type="text" v-model="post.content" />
        <div class="input-group-append">
          <b-button type="submit" variant="primary">Add post</b-button>
        </div>
      </b-input-group>
    </form>
    <section class="group__content mt-2">
      <div class="posts">
        <app-post v-for="post in posts" :key="post.id" :post="post"></app-post>
      </div>
      <b-button variant="primary" @click="loadPosts" class="my-4 mx-auto"
        >Load more</b-button
      >
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
      page: 2,
      post: null
    }
  },
  computed: {
    group() {
      return this.$store.getters['user/getGroup'](this.id).group
    },
    user() {
      return this.$store.getters['user/getGroup'](this.id)
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
    createNewPost() {
      return {
        groupId: this.id,
        participantId: this.participantId,
        content: ''
      }
    },
    async addPost() {
      try {
        await this.$http.group.addPost(this.post)

        this.post = this.createNewPost()
      } catch (error) {
        this.$alert.display(error)
      }
    },
    openSettings(group) {
      this.openModal('groupSettings', group)
    },
    loadPosts() {
      try {
        this.$store.dispatch('user/fetchPosts', {
          id: this.id,
          page: this.page
        })

        this.page++
      } catch (error) {
        this.$alert.display(error)
      }
    },
    async refresh() {
      this.$store.dispatch('user/refreshGroup', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  overflow: hidden;
  height: 100%;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;

  &__toolbar {
    display: flex;
    border-bottom: 1px solid #000;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
form {
  margin-left: 10px;
}
</style>
