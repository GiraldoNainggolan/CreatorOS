import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AppLayout from './core/layouts/AppLayout.vue'

// Basic router setup for tests
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div>Home</div>' }
    }
  ]
})

describe('Phase 3A Foundation Verification', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('mounts the App component successfully', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    // Check if AppLayout is used
    expect(wrapper.findComponent(AppLayout).exists()).toBe(true)
  })

  it('can initialize Pinia and Router without errors', async () => {
    const pinia = createPinia()
    
    const wrapper = mount(AppLayout, {
      global: {
        plugins: [pinia, router]
      }
    })
    
    // If we reach here, it mounted without crashing
    expect(wrapper.exists()).toBe(true)
  })
})
