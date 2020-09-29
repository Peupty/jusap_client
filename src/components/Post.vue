<template>
  <div class="post col">
    <h5 class="text-left">{{ post.author.nickname }}</h5>
    <p class="text-left">{{ post.content }}</p>
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

  &:first-of-type {
    margin-top: 10px;
  }
  p {
    word-wrap: break-word;
  }
  &__react {
    max-width: 100px;
  }
}
</style>
