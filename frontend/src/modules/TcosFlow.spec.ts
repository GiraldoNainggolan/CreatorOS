import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import DashboardView from './dashboard/DashboardView.vue'
import GeneratorView from './generator/GeneratorView.vue'
import ContentPipelineView from './pipeline/ContentPipelineView.vue'
import ContentWorkspaceView from './workspace/ContentWorkspaceView.vue'
import { ContentService } from '../core/services/ContentService'
import { createRouter, createWebHistory } from 'vue-router'

// Mock icons
vi.mock('lucide-vue-next', () => ({
  Plus: { template: '<span></span>' },
  Sparkles: { template: '<span></span>' },
  Eye: { template: '<span></span>' },
  Activity: { template: '<span></span>' },
  Users: { template: '<span></span>' },
  Clock: { template: '<span></span>' },
  RefreshCw: { template: '<span></span>' },
  Loader2: { template: '<span></span>' },
  FileText: { template: '<span></span>' },
  Hash: { template: '<span></span>' },
  Video: { template: '<span></span>' },
  FolderKanban: { template: '<span></span>' },
  Folder: { template: '<span></span>' },
  CheckCircle2: { template: '<span></span>' },
  Save: { template: '<span></span>' },
  Lightbulb: { template: '<span></span>' },
  Info: { template: '<span></span>' },
  ChevronDown: { template: '<span></span>' },
  Check: { template: '<span></span>' },
  ChevronLeft: { template: '<span></span>' },
  ChevronRight: { template: '<span></span>' },
  Search: { template: '<span></span>' },
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div></div>' } },
    { path: '/generate', component: { template: '<div></div>' } },
    { path: '/content', component: { template: '<div></div>' } },
    { path: '/content/:id', component: { template: '<div></div>' } }
  ]
})

// Mock components to avoid deep mounting issues
const globalStubs = {
  AppButton: { template: '<button><slot/></button>' },
  AppCard: { template: '<div><slot/></div>' },
  AppBadge: { template: '<span><slot/></span>' },
  AppInput: { template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />', props: ['modelValue'] },
  AppSelect: { template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option v-for="opt in options" :value="opt">{{opt}}</option></select>', props: ['modelValue', 'options'] },
  AppTextarea: { template: '<textarea :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)"></textarea>', props: ['modelValue'] },
  AppDivider: { template: '<hr/>' }
}

describe('TCOS Core Flow', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })

  it('Dashboard renders correctly', async () => {
    const wrapper = mount(DashboardView, {
      global: { plugins: [router], stubs: globalStubs }
    })
    await flushPromises()
    expect(wrapper.text()).toContain('Good morning, Giraldo')
    expect(wrapper.text()).toContain('Generate Content')
    expect(wrapper.text()).toContain('Views')
  })

  it('Generator renders as wizard and can interact', async () => {
    const wrapper = mount(GeneratorView, {
      global: { plugins: [router], stubs: globalStubs }
    })
    await flushPromises()
    
    // Wizard step 1
    expect(wrapper.text()).toContain('What do you want to talk about?')
    const input = wrapper.find('input')
    if (input.exists()) await input.setValue('Laravel Test')
    
    // Go to next step
    const nextBtn = wrapper.findAll('button').filter(w => w.text().includes('Next Step'))[0]
    if (nextBtn) {
      await nextBtn.trigger('click')
      await flushPromises()
      
      // Step 2 Audience
      expect(wrapper.text()).toContain('Who is this for?')
    }
  })

  it('Content Pipeline renders correctly with filters', async () => {
    const wrapper = mount(ContentPipelineView, {
      global: { plugins: [router], stubs: globalStubs }
    })
    await flushPromises()
    expect(wrapper.text()).toContain('Content Pipeline')
    expect(wrapper.text()).toContain('IDEA')
    expect(wrapper.text()).toContain('SCRIPT')
  })

  it('Content Workspace loads and allows script editing', async () => {
    vi.spyOn(ContentService, 'getContentById').mockResolvedValue({
      id: 'CNT-2026-00001',
      parentIdeaId: 'IDEA-2026-00001',
      title: 'The Future of AI',
      status: 'SCRIPT',
      platform: 'YouTube',
      audience: 'Tech Enthusiast',
      angle: 'Tutorial',
      hookType: 'Curiosity',
      framework: 'PAS',
      visualIdea: 'Talking head',
      aRoll: '',
      bRoll: '',
      caption: '',
      hashtags: [],
      keywords: [],
      script: { hook: 'Welcome to the future', body: 'AI is here', cta: 'Subscribe' },
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01'
    } as any)
    
    router.push('/content/CNT-2026-00001')
    await router.isReady()

    const wrapper = mount(ContentWorkspaceView, {
      global: { plugins: [router], stubs: globalStubs }
    })
    await flushPromises()
    
    expect(wrapper.text()).toContain('Script')
    expect(wrapper.text()).toContain('Autosave Enabled')
    
    // Switch to Hook tab
    const hookTab = wrapper.findAll('button').filter(w => w.text() === 'Hook')[0]
    if (hookTab) await hookTab.trigger('click')
    
    // Save changes
    const saveBtn = wrapper.findAll('button').filter(w => w.text().includes('Save Now'))[0]
    if (saveBtn) await saveBtn.trigger('click')
  })
})
