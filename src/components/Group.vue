<template>
  <div class="group col" :style="{ background: group.color }">
    <div class="row group__toolbar">
      <h3>{{ group.name }} | {{ user.nickname }}</h3>
      <div>
        <button
          class="settings"
          v-if="isAdmin"
          @click.prevent="openSettings(group)"
        >
          settings
        </button>
        <button @click.prevent="refresh">refresh</button>
      </div>
    </div>
    <form @submit.prevent="addPost" class="row">
      <input type="text" v-model="post.content" />
      <button type="submit">add post</button>
    </form>
    <section class="group__content">
      <div class="posts">
        <app-post v-for="post in posts" :key="post.id" :post="post"></app-post>
      </div>
      <button @click="loadPosts">load more</button>
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
  mounted() {},
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
        console.log(error)
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
        console.log(error)
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
  padding-bottom: 20px;
  border: 1px solid #000;

  &__toolbar {
    border-bottom: 1px solid #000;
    margin: 10px 0;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    height: 100%;
    overflow: auto;
  }
}
form {
  margin-left: 10px;
}
</style>
