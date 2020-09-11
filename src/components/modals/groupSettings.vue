<template>
  <form class="groupSettings col">
    <h3>
      Edit {{ data.name }} settings
    </h3>
  </form>
</template>

<script>
export default {
  props: {
    modalProps: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(this.modalProps))
    }
  }
}
</script>

<style></style>
