import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from './AppInput.vue'

describe('AppInput.vue', () => {
  it('renders label correctly', () => {
    const wrapper = mount(AppInput, {
      props: {
        label: 'Username'
      }
    })
    expect(wrapper.find('label').text()).toBe('Username')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: ''
      }
    })
    const input = wrapper.find('input')
    await input.setValue('test user')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test user'])
  })

  it('renders error message when error prop is provided', () => {
    const wrapper = mount(AppInput, {
      props: {
        error: 'Invalid username'
      }
    })
    expect(wrapper.find('p.text-destructive').text()).toBe('Invalid username')
    expect(wrapper.find('input').classes()).toContain('border-destructive')
  })
})
