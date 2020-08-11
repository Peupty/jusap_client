<template>
  <div class="post">
    <h4>{{ post.author.nickname }}</h4>
    <p>{{ post.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  width: 80%;
  margin: 0 auto;
  p {
    word-wrap: break-word;
  }
}
</style>
