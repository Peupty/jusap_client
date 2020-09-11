import modals from '@/components/modals/index.js'

function mixin(modals) {
  return {
    methods: {
      openModal(modal, props) {
        this.$eventBus.$emit('open-modal', { component: modals[modal], props })
      }
    }
  }
}

export default mixin(modals)
