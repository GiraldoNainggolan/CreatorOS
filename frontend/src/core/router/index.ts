import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../layouts/AuthLayout.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: false }, // Disabling auth for Phase 3C mock presentation
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../../modules/dashboard/DashboardView.vue')
        },
        {
          path: 'generate',
          name: 'generate',
          component: () => import('../../modules/generator/GeneratorView.vue')
        },
        {
          path: 'content',
          name: 'content-pipeline',
          component: () => import('../../modules/pipeline/ContentPipelineView.vue')
        },
        {
          path: 'content/:id',
          name: 'content-workspace',
          component: () => import('../../modules/workspace/ContentWorkspaceView.vue')
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('../../components/AppPlaceholder.vue')
        }
      ]
    }
  ]
})

// Bypassing auth check for Phase 3C
router.beforeEach((_to, _from, next) => {
  // Simulate auth check for prototype
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    authStore.user = { id: 1, email: 'demo@creatoros.com', name: 'Giraldo' }
  }
  next()
})

export default router
