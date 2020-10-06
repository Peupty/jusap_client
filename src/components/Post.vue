<template>
  <div class="post">
    <div class="post__author my-2 ml-2">
      <b-avatar></b-avatar>
      <h5 class="text-left ml-2">{{ post.author.nickname }}</h5>
    </div>
    <div class="post__content mx-2">
      <p class="text-left">{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    react() {}
  }
}
</script>

<style lang="scss" scoped>
.post {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #000;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    margin-top: 10px;
  }
  p {
    word-wrap: break-word;
  }
  &__author {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__react {
    max-width: 100px;
  }
}
</style>
