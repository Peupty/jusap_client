<template>
  <div class="post col">
    <h4>{{ post.author.nickname }}</h4>
    <p>{{ post.content }}</p>
    <button class="post__react" @click="react(post.id)">react</button>
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
    react() {

    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #000;
  margin-bottom: 10px;

  &:first-of-type {
    margin-top: 10px;
  }
  p {
    word-wrap: break-word;
  }
  &__react {
    width: 50px;
  }
}
</style>
