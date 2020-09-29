<template>
  <form class="col" @submit.prevent="onSubmit">
    <b-form-group>
      <label for="">Group name:</label>
      <b-input type="text" name="" v-model="group.name" v-autofocus required />
    </b-form-group>
    <b-form-group>
      <label for="">Nickname:</label>
      <b-input type="text" v-model="group.nickname" required />
    </b-form-group>
    <b-form-group>
      <label for="">Category:</label>
      <b-input type="text" name="" v-model="group.category" required />
    </b-form-group>
    <b-form-group>
      <label for="">Description:</label>
      <b-form-textarea
        type="textarea"
        name=""
        v-model="group.description"
        required
      />
    </b-form-group>
    <b-form-group>
      <label for="color">Color:</label>
      <input name="color" type="color" class="ml-2" v-model="group.color" />
    </b-form-group>
    <b-form-checkbox
      name="private"
      type="checkbox"
      class="form-check-input"
      v-model="group.private"
      >Private
    </b-form-checkbox>
    <b-form-checkbox
      name="accept"
      type="checkbox"
      class="form-check-input"
      v-model="group.accept"
    >
      Require accept
    </b-form-checkbox>
    <b-form-checkbox
      name="questionnaire"
      type="checkbox"
      v-model="form"
      @change.native="toggleQuestionnaire"
      class="form-check-input"
    >
      Form
    </b-form-checkbox>
    <b-form-group v-if="form">
      <label>Questions:</label>
      <b-list-group class="col">
        <b-list-group-item v-for="(item, key) in groupForm.form" :key="key">
          {{ key }}
        </b-list-group-item>
      </b-list-group>
      <b-input-group ref="questions" class="mt-3">
        <input type="text" v-model="question" class="form-control" />
        <div class="input-group-append">
          <button @click.prevent="addQuestion" class="btn btn-primary">
            Add
          </button>
        </div>
      </b-input-group>
    </b-form-group>
    <b-button variant="primary" type="submit" class="mt-4">Create</b-button>
  </form>
</template>

<script>
export default {
  name: 'Create-Group',
  data() {
    return {
      group: this.createNewGroup(),
      form: false,
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
        color: '#ffccaa'
      }
    },
    async onSubmit() {
      try {
        await this.$http.group.create(this.group)

        this.$eventBus.$emit('close-modal')
      } catch (e) {
        this.$alert.display(e)
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
