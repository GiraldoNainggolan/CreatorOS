import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from './AppButton.vue'

describe('AppButton.vue', () => {
  it('renders default slot content', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click Me'
      }
    })
    expect(wrapper.text()).toContain('Click Me')
  })

  it('emits click event when not disabled', async () => {
    const wrapper = mount(AppButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'destructive'
      }
    })
    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(AppButton, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
