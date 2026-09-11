import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../../modules/LandingPage.vue'),
      meta: { isPublic: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../../modules/auth/LoginView.vue'),
      meta: { isPublic: true, guestOnly: true }
    },
    {
      path: '/app',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../../modules/dashboard/DashboardView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'generate',
          name: 'generate',
          component: () => import('../../modules/generator/GeneratorView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'content',
          name: 'content-pipeline',
          component: () => import('../../modules/pipeline/ContentPipelineView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'content/:id',
          name: 'content-workspace',
          component: () => import('../../modules/workspace/ContentWorkspaceView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'workspace/:domain',
          name: 'workspace-domain',
          component: () => import('../../modules/workspace/DomainWorkspaceView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../../modules/profile/ProfileView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../../modules/settings/SettingsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('../../components/AppPlaceholder.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    // Convenient shortcut redirects
    { path: '/generate', redirect: '/app/generate' },
    { path: '/content', redirect: '/app/content' },
    { path: '/content/:id', redirect: to => ({ path: `/app/content/${to.params.id}` }) },
    { path: '/workspace/:domain', redirect: to => ({ path: `/app/workspace/${to.params.domain}` }) },
    { path: '/profile', redirect: '/app/profile' },
    { path: '/settings', redirect: '/app/settings' }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Initialize Supabase session on first navigation
  if (!authStore.isInitialized) {
    await authStore.initializeAuth().catch(() => {})
  }

  // Dynamic document title
  if (to.name === 'login') {
    document.title = 'Sign In | CreatorOS'
  } else if (to.name === 'landing') {
    document.title = 'CreatorOS | The Creator Operating System'
  } else if (to.params.domain) {
    const domainName = String(to.params.domain).toUpperCase()
    document.title = `${domainName} | CreatorOS Workspace`
  } else if (to.name) {
    const title = String(to.name).replace(/-/g, ' ')
    document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | CreatorOS`
  }

  // If already authenticated and visits /login, redirect to /app
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next({ path: '/app' })
    return
  }

  // Public routes (landing, login)
  if (to.meta.isPublic) {
    next()
    return
  }

  // Protected route enforcement
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  next()
})

export default router
