<template>
  <form class="col" @submit.prevent="onSubmit">
    <section class="col">
      <label for="">group name:</label>
      <input type="text" name="" v-model="group.name" v-autofocus required/>
      <label for="">nickname:</label>
      <input type="text" v-model="group.nickname" required/>
      <label for="">category:</label>
      <input type="text" name="" v-model="group.category" required/>
      <label for="">description:</label>
      <input type="textarea" name="" v-model="group.description" required/>
    </section>
    <section class="col">
      <div class="row">
        <label for="">private:</label>
        <input type="checkbox" v-model="group.private" />
      </div>
      <div class="row">
        <label for="">require accept:</label>
        <input type="checkbox" v-model="group.accept" />
      </div>
      <div class="row">
        <label>Color</label>
        <input type="color" v-model="group.color" />
      </div>
      <div class="row">
        <label for="">form:</label>
        <input type="checkbox" v-model="form" @change="toggleQuestionnaire" />
      </div>
    </section>
    <section class="col" v-if="form">
      <label for="">questions:</label>
      <ul class="col">
        <li v-for="(item, key) in groupForm.form" :key="key">
          {{ key }}
        </li>
      </ul>
      <div class="row" ref="questions">
        <input type="text" v-model="question" />
        <button @click.prevent="addQuestion">add</button>
      </div>
    </section>
    <button type="submit">create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      group: this.createNewGroup(),
      form: 0,
      groupForm: {
        form: {}
      },
      question: ''
    }
  },
  methods: {
    createNewGroup() {
      return {
        nickname: '',
        name: '',
        description: '',
        category: '',
        imagePath: '',
        accept: 0,
        private: 0,
        reactionId: 1,
        color: ''
      }
    },
    async onSubmit() {
      try {
        await this.$http.group.create(this.group)

        this.$eventBus.$emit('close-modal')
      } catch (e) {
        alert(e)
      }
    },
    addQuestion() {
      this.group.groupForm.form[this.question] = ''
      this.question = ''
    },
    toggleQuestionnaire(ev) {
      ev.target.checked
        ? (this.group.groupForm = this.groupForm)
        : delete this.group.groupForm
    }
  }
}
</script>

<style></style>
