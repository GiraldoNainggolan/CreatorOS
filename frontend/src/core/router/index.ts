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
      meta: { requiresAuth: false }, // Preserving access for prototype navigation
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
    },
    // Legacy route redirects (preserve old paths)
    { path: '/generate', redirect: '/app/generate' },
    { path: '/content', redirect: '/app/content' },
    { path: '/content/:id', redirect: to => ({ path: `/app/content/${to.params.id}` }) }
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
    document.title = 'Sign In | TCOS'
  } else if (to.name === 'landing') {
    document.title = 'TCOS | The Creator Operating System'
  } else if (to.name) {
    document.title = `${String(to.name).charAt(0).toUpperCase() + String(to.name).slice(1)} | TCOS`
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

  // Fallback demo user session if in app prototype without live credentials
  if (!authStore.isAuthenticated && to.path.startsWith('/app') && !authStore.user) {
    authStore.user = { id: 1, email: 'demo@creatoros.com', name: 'Giraldo' }
  }

  next()
})

export default router
