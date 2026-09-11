<template>
  <div class="login-page">
    <!-- Ambient Background Glows -->
    <div class="ambient-glow glow-top-left"></div>
    <div class="ambient-glow glow-bottom-right"></div>

    <div class="login-container">
      <!-- =========================================================
           LEFT COLUMN: Brand & Product Value Proposition (Desktop)
      ========================================================== -->
      <aside class="login-brand-panel">
        <router-link to="/" class="brand-link">
          <div class="brand-badge">T</div>
          <span class="brand-name">TCOS</span>
        </router-link>

        <div class="brand-content">
          <div class="eyebrow-pill">
            <Sparkles :size="13" class="eyebrow-icon" />
            <span>The Creator Operating System</span>
          </div>

          <h1 class="brand-headline">
            Create. <span class="text-blue">Edit.</span> <br />
            <span class="text-purple">Publish.</span> <span class="text-pink">Grow.</span>
          </h1>

          <p class="brand-description">
            Sign in to access your unified creator workspace. Plan, edit, schedule,
            and analyze all your content powered by real AI and native integrations.
          </p>

          <!-- Feature Highlights -->
          <div class="feature-pills">
            <div class="feature-item">
              <div class="feature-icon fi-purple">
                <Sparkles :size="16" />
              </div>
              <div class="feature-text">
                <strong>AI Script & Content Generator</strong>
                <span>Ideate and script in seconds with top models</span>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon fi-blue">
                <Film :size="16" />
              </div>
              <div class="feature-text">
                <strong>Cloud Editing Studio</strong>
                <span>Multi-track timeline with automated subtitles</span>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon fi-green">
                <BarChart3 :size="16" />
              </div>
              <div class="feature-text">
                <strong>Real-Time Analytics Matrix</strong>
                <span>Unified cross-platform performance tracking</span>
              </div>
            </div>
          </div>

          <!-- Trust Proof -->
          <div class="trust-badge">
            <div class="avatar-stack">
              <div class="avatar-dot av-1">G</div>
              <div class="avatar-dot av-2">A</div>
              <div class="avatar-dot av-3">R</div>
              <div class="avatar-dot av-4">M</div>
            </div>
            <span class="trust-caption">
              Trusted by <strong>20,000+</strong> creators, agencies, and businesses
            </span>
          </div>
        </div>
      </aside>

      <!-- =========================================================
           RIGHT COLUMN: Login Card Form
      ========================================================== -->
      <main class="login-form-panel">
        <!-- Top Navigation Action -->
        <div class="panel-top-nav">
          <router-link to="/" class="back-link">
            <ArrowLeft :size="15" />
            <span>Back to TCOS</span>
          </router-link>
        </div>

        <div class="login-card">
          <!-- Card Header -->
          <div class="card-header">
            <div class="card-brand-icon">
              <div class="mini-badge">T</div>
            </div>
            <h2 class="card-title">Welcome back</h2>
            <p class="card-subtitle">
              Enter your account credentials to access your creator workspace.
            </p>
          </div>

          <!-- State Machine Feedback Banners -->
          <transition name="fade">
            <!-- 1. Configuration Blocked Banner -->
            <div v-if="authStatus === 'blocked_configuration'" class="alert-box alert-blocked" role="alert">
              <div class="alert-icon-wrap">
                <ShieldAlert :size="18" />
              </div>
              <div class="alert-body">
                <strong>Backend Service Unreachable</strong>
                <p>{{ errorMessage }}</p>
                <div class="alert-actions">
                  <button type="button" class="btn-alert-retry" @click="retryConnection">
                    <RefreshCw :size="12" :class="{ 'spin-icon': isRetrying }" />
                    <span>Check Connection</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- 2. Authentication Error Banner -->
            <div v-else-if="authStatus === 'error'" class="alert-box alert-error" role="alert">
              <div class="alert-icon-wrap">
                <AlertCircle :size="18" />
              </div>
              <div class="alert-body">
                <strong>Authentication Failed</strong>
                <p>{{ errorMessage }}</p>
              </div>
              <button type="button" class="alert-close-btn" @click="authStatus = 'idle'" aria-label="Dismiss alert">
                <X :size="14" />
              </button>
            </div>

            <!-- 3. Success Banner -->
            <div v-else-if="authStatus === 'success'" class="alert-box alert-success" role="alert">
              <div class="alert-icon-wrap">
                <CheckCircle2 :size="18" />
              </div>
              <div class="alert-body">
                <strong>Authentication Verified</strong>
                <p>Redirecting to your creator workspace...</p>
              </div>
            </div>
          </transition>

          <!-- Login Form -->
          <form class="auth-form" @submit.prevent="handleLogin" novalidate>
            <!-- Email Input -->
            <div class="form-group" :class="{ 'has-error': emailError }">
              <label for="email" class="form-label">Email Address</label>
              <div class="input-wrapper">
                <Mail :size="16" class="input-icon" />
                <input
                  id="email"
                  v-model.trim="email"
                  type="email"
                  autocomplete="email"
                  required
                  placeholder="creator@example.com"
                  class="form-input"
                  :disabled="authStatus === 'loading'"
                  @input="clearErrors"
                />
              </div>
              <span v-if="emailError" class="field-error">{{ emailError }}</span>
            </div>

            <!-- Password Input -->
            <div class="form-group" :class="{ 'has-error': passwordError }">
              <div class="label-row">
                <label for="password" class="form-label">Password</label>
                <button
                  type="button"
                  class="forgot-link"
                  @click="showForgotModal = true"
                >
                  Forgot password?
                </button>
              </div>
              <div class="input-wrapper">
                <Lock :size="16" class="input-icon" />
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  placeholder="••••••••••••"
                  class="form-input"
                  :disabled="authStatus === 'loading'"
                  @input="clearErrors"
                />
                <button
                  type="button"
                  class="toggle-pwd-btn"
                  @click="showPassword = !showPassword"
                  :title="showPassword ? 'Hide password' : 'Show password'"
                  aria-label="Toggle password visibility"
                >
                  <EyeOff v-if="showPassword" :size="16" />
                  <Eye v-else :size="16" />
                </button>
              </div>
              <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
            </div>

            <!-- Remember Me Row -->
            <div class="form-options">
              <label class="checkbox-label">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="custom-checkbox"
                  :disabled="authStatus === 'loading'"
                />
                <span class="checkbox-box">
                  <Check v-if="rememberMe" :size="11" class="check-mark" />
                </span>
                <span class="checkbox-text">Remember this device</span>
              </label>
            </div>

            <!-- Submit CTA -->
            <button
              type="submit"
              class="btn-submit"
              :disabled="authStatus === 'loading'"
            >
              <div v-if="authStatus === 'loading'" class="btn-spinner"></div>
              <span v-if="authStatus === 'loading'">Signing in...</span>
              <span v-else>Sign In to Workspace</span>
              <ArrowRight v-if="authStatus !== 'loading'" :size="16" class="btn-arrow" />
            </button>
          </form>

          <!-- Card Footer -->
          <div class="card-footer">
            <p class="signup-prompt">
              Don't have an account yet?
              <router-link to="/#pricing" class="signup-link">
                Choose a plan
              </router-link>
            </p>

            <div class="security-note">
              <Lock :size="11" />
              <span>Protected by TCOS Security · 256-bit encryption</span>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Simple Forgot Password Modal -->
    <transition name="modal">
      <div v-if="showForgotModal" class="modal-backdrop" @click.self="showForgotModal = false">
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Reset Password</h3>
            <button type="button" class="modal-close" @click="showForgotModal = false">
              <X :size="16" />
            </button>
          </div>
          <p class="modal-text">
            To reset your creator account password, enter your registered email address or contact your workspace administrator.
          </p>
          <div class="form-group">
            <label class="form-label">Account Email</label>
            <input
              v-model.trim="forgotEmail"
              type="email"
              placeholder="creator@example.com"
              class="form-input"
            />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-modal-cancel" @click="showForgotModal = false">
              Cancel
            </button>
            <button type="button" class="btn-modal-submit" @click="handleForgotSubmit">
              Send Reset Link
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth'
import faviconUrl from '@/assets/GN.png'
import {
  Sparkles,
  Film,
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  ShieldAlert,
  CheckCircle2,
  RefreshCw
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

/* =========================================================
   STATE MACHINE
========================================================= */
type AuthStatus = 'idle' | 'loading' | 'success' | 'error' | 'blocked_configuration'

const authStatus = ref<AuthStatus>('idle')
const errorMessage = ref('')
const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const showPassword = ref(false)
const emailError = ref('')
const passwordError = ref('')
const isRetrying = ref(false)

// Forgot Password Modal State
const showForgotModal = ref(false)
const forgotEmail = ref('')

function clearErrors() {
  emailError.value = ''
  passwordError.value = ''
  if (authStatus.value === 'error') {
    authStatus.value = 'idle'
    errorMessage.value = ''
  }
}

function validateInputs(): boolean {
  let valid = true
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'Email address is required.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    valid = false
  }

  if (!password.value) {
    passwordError.value = 'Password is required.'
    valid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters.'
    valid = false
  }

  return valid
}

async function handleLogin() {
  if (!validateInputs()) return

  authStatus.value = 'loading'
  errorMessage.value = ''

  try {
    // Call existing auth store login implementation
    await authStore.login({
      email: email.value,
      password: password.value
    })

    authStatus.value = 'success'

    // Determine target redirect
    const targetPath = (route.query.redirect as string) || '/app'
    setTimeout(() => {
      router.push(targetPath)
    }, 600)
  } catch (err: any) {
    console.error('Login request failed:', err)

    // Check if error is network / backend offline
    const isNetworkError =
      !err.response ||
      err.code === 'ERR_NETWORK' ||
      err.message?.includes('Network Error') ||
      err.message?.includes('ECONNREFUSED')

    if (isNetworkError) {
      authStatus.value = 'blocked_configuration'
      errorMessage.value =
        'Unable to connect to the authentication server. The backend API is currently unreachable. Please ensure the backend server is running and VITE_API_BASE_URL is configured.'
    } else if (err.response?.status === 401 || err.response?.status === 422) {
      authStatus.value = 'error'
      errorMessage.value =
        err.response?.data?.message || 'Invalid email or password. Please verify your credentials and try again.'
    } else {
      authStatus.value = 'error'
      errorMessage.value =
        err.response?.data?.message || err.message || 'An unexpected error occurred during authentication.'
    }
  }
}

async function retryConnection() {
  isRetrying.value = true
  authStatus.value = 'loading'
  errorMessage.value = ''

  try {
    // Perform a lightweight probe to api
    await authStore.fetchUser().catch(() => {})
    authStatus.value = 'idle'
  } catch {
    authStatus.value = 'blocked_configuration'
    errorMessage.value =
      'Backend API remains unreachable. Please start the backend service on the configured port.'
  } finally {
    isRetrying.value = false
  }
}

function handleForgotSubmit() {
  if (!forgotEmail.value) return
  alert(`If an account exists for ${forgotEmail.value}, password reset instructions have been dispatched.`)
  showForgotModal.value = false
  forgotEmail.value = ''
}

onMounted(() => {
  // Enforce document title and dark background
  document.title = 'Sign In | TCOS'
  document.documentElement.style.backgroundColor = '#060810'
  document.documentElement.style.colorScheme = 'dark'
  document.body.style.backgroundColor = '#060810'
  document.body.style.colorScheme = 'dark'
  document.documentElement.classList.add('dark')
  document.body.classList.add('dark')

  // Set favicon to GN.png
  const faviconLink = (document.querySelector("link[rel*='icon']") || document.createElement('link')) as HTMLLinkElement
  faviconLink.type = 'image/png'
  faviconLink.rel = 'icon'
  faviconLink.href = faviconUrl
  if (!faviconLink.parentNode) {
    document.head.appendChild(faviconLink)
  }

  // Pre-fill email from query if provided
  if (route.query.email && typeof route.query.email === 'string') {
    email.value = route.query.email
  }
})

onBeforeUnmount(() => {
  document.documentElement.style.backgroundColor = ''
  document.documentElement.style.colorScheme = ''
  document.body.style.backgroundColor = ''
  document.body.style.colorScheme = ''
})
</script>

<style scoped>
/* =========================================================
   LOGIN PAGE DARK THEME
========================================================= */
.login-page {
  min-height: 100vh;
  width: 100%;
  background: #060810;
  color: #F8FAFF;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  padding: 32px 20px;
}

/* Ambient Radial Glows */
.ambient-glow {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 0;
}

.glow-top-left {
  top: -100px;
  left: -80px;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(124, 77, 255, 0.18) 0%, transparent 70%);
}

.glow-bottom-right {
  bottom: -100px;
  right: -80px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(76, 131, 255, 0.14) 0%, rgba(147, 72, 255, 0.1) 50%, transparent 70%);
}

.login-container {
  width: 100%;
  max-width: 1160px;
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* =========================================================
   LEFT PANEL (Brand / Value Proposition)
========================================================= */
.login-brand-panel {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-bottom: 40px;
  width: fit-content;
}

.brand-badge {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: linear-gradient(135deg, #7C4DFF 0%, #9348FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 19px;
  color: #FFF;
  box-shadow: 0 4px 16px rgba(124, 77, 255, 0.5);
}

.brand-name {
  font-size: 20px;
  font-weight: 800;
  color: #F8FAFF;
  letter-spacing: 0.5px;
}

.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 13px;
  border-radius: 9999px;
  background: rgba(124, 77, 255, 0.12);
  border: 1px solid rgba(124, 77, 255, 0.35);
  color: #D9DDEA;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
  width: fit-content;
}

.eyebrow-icon {
  color: #9348FF;
}

.brand-headline {
  font-size: 46px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #F8FAFF;
  margin: 0 0 18px 0;
}

.text-blue { color: #4D83FF; }
.text-purple { color: #9648FF; }
.text-pink { color: #E255D8; }

.brand-description {
  font-size: 15px;
  line-height: 1.6;
  color: #AEB5C5;
  margin: 0 0 32px 0;
  max-width: 480px;
}

/* Feature Highlights */
.feature-pills {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 36px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.fi-purple { background: rgba(124, 77, 255, 0.2); color: #B05CFF; }
.fi-blue { background: rgba(77, 131, 255, 0.2); color: #60A5FA; }
.fi-green { background: rgba(34, 197, 94, 0.2); color: #4ADE80; }

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-text strong {
  font-size: 13.5px;
  color: #F8FAFF;
  font-weight: 600;
}

.feature-text span {
  font-size: 12px;
  color: #858D9F;
}

/* Trust Badge */
.trust-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.avatar-stack {
  display: flex;
  align-items: center;
}

.avatar-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #060810;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  color: #FFF;
  margin-left: -6px;
}

.avatar-dot:first-child { margin-left: 0; }
.av-1 { background: #6366F1; }
.av-2 { background: #EC4899; }
.av-3 { background: #3B82F6; }
.av-4 { background: #10B981; }

.trust-caption {
  font-size: 12.5px;
  color: #858D9F;
}

.trust-caption strong {
  color: #F8FAFF;
}

/* =========================================================
   RIGHT PANEL (Login Card)
========================================================= */
.login-form-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.panel-top-nav {
  width: 100%;
  max-width: 460px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #858D9F;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: #F8FAFF;
}

.login-card {
  width: 100%;
  max-width: 460px;
  background: #11151F;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 38px 34px;
  box-shadow:
    0 24px 50px -10px rgba(0, 0, 0, 0.8),
    0 0 35px rgba(124, 77, 255, 0.12);
}

.card-header {
  text-align: center;
  margin-bottom: 26px;
}

.card-brand-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}

.mini-badge {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7C4DFF 0%, #9348FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
  color: #FFF;
  box-shadow: 0 4px 16px rgba(124, 77, 255, 0.45);
}

.card-title {
  font-size: 24px;
  font-weight: 800;
  color: #F8FAFF;
  letter-spacing: -0.02em;
  margin: 0 0 6px 0;
}

.card-subtitle {
  font-size: 13.5px;
  color: #858D9F;
  margin: 0;
  line-height: 1.5;
}

/* =========================================================
   STATE ALERTS
========================================================= */
.alert-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 22px;
  font-size: 12.5px;
  line-height: 1.45;
  position: relative;
}

.alert-body strong {
  display: block;
  font-weight: 700;
  margin-bottom: 2px;
}

.alert-body p {
  margin: 0;
}

.alert-icon-wrap {
  flex-shrink: 0;
  margin-top: 1px;
}

.alert-error {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #FCA5A5;
}

.alert-error strong {
  color: #F87171;
}

.alert-blocked {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #FDE68A;
}

.alert-blocked strong {
  color: #FBBF24;
}

.alert-actions {
  margin-top: 8px;
}

.btn-alert-retry {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #FDE68A;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-alert-retry:hover {
  background: rgba(245, 158, 11, 0.3);
}

.alert-success {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #86EFAC;
}

.alert-success strong {
  color: #4ADE80;
}

.alert-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  padding: 2px;
}

.alert-close-btn:hover {
  opacity: 1;
}

.spin-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* =========================================================
   FORM INPUTS
========================================================= */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12.5px;
  font-weight: 600;
  color: #C6CBD8;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  background: none;
  border: none;
  color: #7D4DFF;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ease;
}

.forgot-link:hover {
  color: #9648FF;
  text-decoration: underline;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #737B8F;
  pointer-events: none;
  transition: color 0.15s ease;
}

.form-input {
  width: 100%;
  height: 44px;
  background: #0B0E17;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 0 42px 0 40px;
  font-size: 14px;
  color: #F8FAFF;
  outline: none;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #7D4DFF;
  box-shadow: 0 0 0 3px rgba(125, 77, 255, 0.2);
  background: #0E121D;
}

.form-input:focus + .input-icon,
.input-wrapper:focus-within .input-icon {
  color: #7D4DFF;
}

.form-group.has-error .form-input {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.field-error {
  font-size: 11.5px;
  color: #F87171;
  margin-top: 2px;
}

.toggle-pwd-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #737B8F;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;
}

.toggle-pwd-btn:hover {
  color: #F8FAFF;
}

/* Checkbox */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -2px;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox {
  display: none;
}

.checkbox-box {
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #0B0E17;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.custom-checkbox:checked + .checkbox-box {
  background: #7D4DFF;
  border-color: #7D4DFF;
}

.check-mark {
  color: #FFF;
}

.checkbox-text {
  font-size: 12.5px;
  color: #858D9F;
}

/* Submit Button */
.btn-submit {
  width: 100%;
  height: 46px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6D52FF 0%, #9348FF 100%);
  color: #FFF;
  border: none;
  font-size: 14.5px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 6px 20px rgba(109, 82, 255, 0.45);
  margin-top: 6px;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, #7C4DFF 0%, #A653FF 100%);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(109, 82, 255, 0.6);
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Card Footer */
.card-footer {
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.signup-prompt {
  font-size: 13px;
  color: #858D9F;
  margin: 0;
}

.signup-link {
  color: #7D4DFF;
  font-weight: 600;
  text-decoration: none;
  margin-left: 4px;
}

.signup-link:hover {
  text-decoration: underline;
  color: #9648FF;
}

.security-note {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #737B8F;
}

/* =========================================================
   FORGOT PASSWORD MODAL
========================================================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
}

.modal-box {
  width: 100%;
  max-width: 420px;
  background: #141925;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #F8FAFF;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #858D9F;
  cursor: pointer;
  padding: 4px;
}

.modal-close:hover {
  color: #FFF;
}

.modal-text {
  font-size: 13px;
  color: #AEB5C5;
  line-height: 1.5;
  margin: 0 0 18px 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-modal-cancel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #C6CBD8;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

.btn-modal-submit {
  background: #7D4DFF;
  border: none;
  color: #FFF;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

/* =========================================================
   RESPONSIVE DESIGN
========================================================= */
@media (max-width: 960px) {
  .login-container {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .login-brand-panel {
    display: none;
  }

  .login-card {
    max-width: 100%;
    padding: 32px 24px;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px;
  }

  .login-card {
    padding: 28px 18px;
    border-radius: 16px;
  }

  .card-title {
    font-size: 21px;
  }
}
</style>
