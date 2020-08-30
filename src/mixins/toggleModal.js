import modals from '@/components/modals/index.js'

function mixin(modals) {
  return {
    methods: {
      openModal(modal) {
        this.$eventBus.$emit('open-modal', modals[modal])
      }
    }
  }
}

export default mixin(modals)
