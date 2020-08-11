import { shallowMount } from '@vue/test-utils'
import Component from '@/views/Log-In.vue'

describe('Log in', () => {
  test('is defined', () => {
    const wrapper = shallowMount(Component)

    expect(wrapper).toBeDefined()
  })

  describe('renders', () => {
    const wrapper = shallowMount(Component)

    test('email input', () => {
      const actual = wrapper.get({ ref: 'email' })

      expect(actual).toBeTruthy()
    })

    test('password input', () => {
      const actual = wrapper.get({ ref: 'password' })

      expect(actual).toBeTruthy()
    })

    test('submit button', () => {
      const actual = wrapper.get({ ref: 'submit' })

      expect(actual).toBeTruthy()
    })
  })

  describe('make request on submit', () => {

  })
})
