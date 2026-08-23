<template>
  <div v-if="content" class="pb-24">
    <!-- Workspace Header -->
    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-6 gap-4">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <AppBadge variant="secondary" class="font-mono text-sm">{{ content.id }}</AppBadge>
          
          <!-- Interactive Status Changer -->
          <div class="relative group">
            <AppBadge variant="default" class="uppercase font-bold cursor-pointer flex items-center gap-1 hover:bg-primary/90">
              {{ content.status }} <ChevronDown class="w-3 h-3" />
            </AppBadge>
            <div class="absolute left-0 top-full mt-1 w-40 bg-card border border-border rounded-md shadow-lg hidden group-hover:block z-50">
              <div 
                v-for="s in ['IDEA', 'SCRIPT', 'RECORDING', 'EDITING', 'READY', 'PUBLISHED']" 
                :key="s"
                @click="updateStatus(s as any)"
                class="px-3 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-secondary transition-colors"
                :class="s === content.status ? 'text-primary' : 'text-foreground'"
              >
                {{ s }}
              </div>
            </div>
          </div>
          
          <AppBadge variant="outline">{{ content.platform }}</AppBadge>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">{{ content.title }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-xs text-muted-foreground mr-2 font-medium flex items-center gap-1">
          <span v-if="isSaving" class="text-amber-500 flex items-center gap-1"><Loader2 class="w-3 h-3 animate-spin" /> Saving...</span>
          <span v-else-if="lastSaved" class="flex items-center gap-1"><CheckCircle2 class="w-3 h-3 text-green-500" /> Saved {{ lastSaved }}</span>
        </div>
        <AppButton variant="outline" @click="$router.push('/content')">Back to Pipeline</AppButton>
        <AppButton class="gap-2" @click="saveChanges" :disabled="isSaving">
          <Save class="w-4 h-4" /> Save Now
        </AppButton>
      </div>
    </div>

    <!-- Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      <!-- Left Sidebar: Tree & Metadata -->
      <div class="lg:col-span-1 space-y-6">
        <AppCard class="p-4">
          <h3 class="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Content Ecosystem</h3>
          <div v-if="idea" class="space-y-3">
            <div class="flex items-center gap-2 text-sm font-bold text-foreground">
              <Lightbulb class="w-4 h-4 text-amber-500" />
              {{ idea.title }}
            </div>
            <div class="ml-2 pl-4 border-l-2 border-border space-y-2">
              <div 
                v-for="variant in variants" 
                :key="variant.id"
                @click="$router.push(`/content/${variant.id}`)"
                :class="[
                  variant.id === content.id ? 'text-primary font-bold bg-primary/5 -ml-4 pl-4 rounded-r-md py-2 border-l-2 border-primary' : 'text-muted-foreground hover:text-foreground cursor-pointer py-1',
                  'flex items-center justify-between text-xs transition-colors'
                ]"
              >
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :class="variant.id === content.id ? 'bg-primary' : 'bg-muted-foreground/30'"></div>
                  {{ variant.platform }}
                </div>
                <AppBadge :variant="variant.status === 'PUBLISHED' ? 'default' : 'secondary'" class="text-[8px] px-1 py-0 uppercase">{{ variant.status }}</AppBadge>
              </div>
            </div>
            <AppButton variant="ghost" size="sm" class="w-full mt-2 text-xs border border-dashed border-border" @click="$router.push('/generate')">
              <Plus class="w-3 h-3 mr-1" /> Add Format
            </AppButton>
          </div>
        </AppCard>

        <AppCard class="p-4 space-y-4">
          <h3 class="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Parameters</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-[10px] text-muted-foreground mb-1 uppercase font-semibold">Pillar</div>
              <div class="text-xs font-medium">{{ idea?.pillar }}</div>
            </div>
            <div>
              <div class="text-[10px] text-muted-foreground mb-1 uppercase font-semibold">Audience</div>
              <div class="text-xs font-medium">{{ content.audience }}</div>
            </div>
            <div>
              <div class="text-[10px] text-muted-foreground mb-1 uppercase font-semibold">Framework</div>
              <div class="text-xs font-medium">{{ content.framework }}</div>
            </div>
            <div>
              <div class="text-[10px] text-muted-foreground mb-1 uppercase font-semibold">Angle</div>
              <div class="text-xs font-medium">{{ content.angle }}</div>
            </div>
          </div>
        </AppCard>
        
        <AppCard class="p-4 space-y-4">
          <h3 class="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">Activity Timeline</h3>
          <div class="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            <div v-for="act in activities" :key="act.id" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div class="flex items-center justify-center w-4 h-4 rounded-full border border-background bg-muted-foreground/30 text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-[2px]"></div>
              <div class="w-[calc(100%-1.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0">
                <div class="flex flex-col">
                  <div class="text-[10px] font-medium text-primary uppercase">{{ act.action }}</div>
                  <div class="text-xs text-foreground">{{ act.description }}</div>
                  <div class="text-[10px] text-muted-foreground mt-0.5">{{ new Date(act.timestamp).toLocaleTimeString() }}</div>
                </div>
              </div>
            </div>
            <div v-if="activities.length === 0" class="text-xs text-muted-foreground italic text-center w-full">No activity yet.</div>
          </div>
        </AppCard>
      </div>

      <!-- Center & Right: Main Workspace -->
      <div class="lg:col-span-3">
        <!-- Tabs -->
        <div class="flex space-x-1 border-b border-border mb-6 overflow-x-auto custom-scrollbar">
          <button 
            v-for="tab in ['Script', 'Hook', 'Visuals', 'Recording', 'Editing', 'Posting', 'Analytics']"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              activeTab === tab ? 'border-primary text-primary font-semibold' : 'border-transparent text-muted-foreground hover:border-muted hover:text-foreground',
              'whitespace-nowrap px-4 py-2 border-b-2 text-sm transition-colors'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Script Workspace -->
        <div v-if="activeTab === 'Script'" class="space-y-6 animate-in fade-in duration-300">
          <div class="flex items-center justify-between">
            <div class="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 border border-amber-500/20">
              <Info class="w-4 h-4" />
              Autosave Enabled
            </div>
            <div class="text-xs font-semibold text-muted-foreground">
              {{ scriptLength }} chars • ~{{ Math.ceil(scriptLength / 15) }}s reading time
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="(_text, key) in content.script" :key="key" class="group">
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-bold uppercase tracking-wider text-muted-foreground">{{ key }}</label>
              </div>
              <AppTextarea 
                v-model="content.script[key as keyof typeof content.script]"
                @input="debouncedSave"
                class="min-h-[100px] text-base leading-relaxed bg-card focus:bg-background transition-colors resize-y border-muted focus:border-primary"
              />
            </div>
          </div>
        </div>

        <!-- Hook Workspace -->
        <div v-else-if="activeTab === 'Hook'" class="space-y-6 animate-in fade-in duration-300">
          <AppCard class="p-6">
            <h2 class="text-lg font-bold mb-4">Current Hook</h2>
            <AppTextarea v-model="content.script.hook" @input="debouncedSave" class="min-h-[120px] text-lg font-medium leading-relaxed" />
            
            <div class="mt-6 pt-6 border-t border-border flex justify-between items-center">
              <div class="text-sm text-muted-foreground">Type: <span class="font-semibold text-foreground">{{ content.hookType }}</span></div>
              <AppButton variant="secondary" class="gap-2">
                <RefreshCw class="w-4 h-4" /> AI Ideas
              </AppButton>
            </div>
          </AppCard>
        </div>

        <!-- Visuals Workspace -->
        <div v-else-if="activeTab === 'Visuals'" class="space-y-6 animate-in fade-in duration-300">
          <AppCard class="p-6 space-y-4">
            <div>
              <label class="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Core Concept</label>
              <AppTextarea v-model="content.visualIdea" @input="debouncedSave" class="min-h-[80px]" />
            </div>
            <div>
              <label class="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">A-Roll (Main Camera)</label>
              <AppTextarea v-model="content.aRoll" @input="debouncedSave" class="min-h-[80px]" />
            </div>
            <div>
              <label class="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">B-Roll (Overlay/B-cam)</label>
              <AppTextarea v-model="content.bRoll" @input="debouncedSave" class="min-h-[80px]" />
            </div>
          </AppCard>
        </div>

        <!-- Placeholder for others -->
        <div v-else class="h-64 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl bg-secondary/10">
          <FolderKanban class="w-10 h-10 text-muted-foreground/50 mb-3" />
          <h2 class="text-lg font-bold text-foreground">{{ activeTab }} Workspace</h2>
          <p class="text-muted-foreground text-sm mt-1 max-w-sm text-center">This phase of the workflow is part of the future Production Module. Currently validating the Idea -> Script loop.</p>
        </div>

      </div>

    </div>
  </div>
  <div v-else-if="isLoading" class="h-64 flex items-center justify-center">
    <Loader2 class="w-8 h-8 animate-spin text-primary" />
  </div>
  <div v-else class="h-64 flex flex-col items-center justify-center">
    <h2 class="text-xl font-bold mb-2">Content Not Found</h2>
    <AppButton @click="$router.push('/content')">Back to Pipeline</AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Save, Loader2, Lightbulb, FolderKanban, RefreshCw, Info, ChevronDown, CheckCircle2, Plus } from 'lucide-vue-next'
import { ContentService } from '../../core/services/ContentService'
import { LocalRepository } from '../../core/services/LocalRepository'
import { useToast } from '../../core/composables/useToast'
import type { ContentVariant, Idea, ActivityEvent, ContentStatus } from '../../core/types/tcos'

import AppButton from '../../core/components/ui/AppButton.vue'
import AppCard from '../../core/components/layout/AppCard.vue'
import AppBadge from '../../core/components/feedback/AppBadge.vue'
import AppTextarea from '../../core/components/ui/AppTextarea.vue'

const route = useRoute()
const { addToast } = useToast()

const isLoading = ref(true)
const isSaving = ref(false)
const lastSaved = ref('')
const content = ref<ContentVariant | null>(null)
const idea = ref<Idea | null>(null)
const variants = ref<ContentVariant[]>([])
const activities = ref<ActivityEvent[]>([])
const activeTab = ref('Script')

const scriptLength = computed(() => {
  if (!content.value?.script) return 0
  return Object.values(content.value.script).join(' ').length
})

const loadData = async (id: string) => {
  isLoading.value = true
  const data = await ContentService.getContentById(id)
  content.value = data
  if (data) {
    idea.value = await ContentService.getIdeaById(data.parentIdeaId)
    variants.value = await ContentService.getVariantsByIdea(data.parentIdeaId)
    loadActivities(id)
  }
  isLoading.value = false
}

const loadActivities = (id: string) => {
  activities.value = LocalRepository.getActivities(id)
}

onMounted(() => {
  if (route.params.id) {
    loadData(route.params.id as string)
  }
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadData(newId as string)
  }
})

const updateStatus = async (status: ContentStatus) => {
  if (!content.value) return
  if (content.value.status === status) return
  
  content.value = await ContentService.updateContentStatus(content.value.id, status)
  loadActivities(content.value!.id)
  addToast(`Status moved to ${status}`, 'success')
  
  // Refresh variants to show status update in sidebar
  variants.value = await ContentService.getVariantsByIdea(content.value!.parentIdeaId)
}

const saveChanges = async () => {
  if (!content.value) return
  isSaving.value = true
  
  // Save script
  await ContentService.updateContentScript(content.value.id, content.value.script)
  
  // Save visual fields manually to LocalRepo since ContentService wrapper might not have it yet
  const c = LocalRepository.getContentById(content.value.id)
  if (c) {
    c.visualIdea = content.value.visualIdea
    c.aRoll = content.value.aRoll
    c.bRoll = content.value.bRoll
    LocalRepository.saveContent(c)
  }
  
  isSaving.value = false
  const now = new Date()
  lastSaved.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  loadActivities(content.value.id)
}

// Simple debounce for autosave
let timeoutId: ReturnType<typeof setTimeout> | null = null
const debouncedSave = () => {
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    saveChanges()
  }, 1500)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}
</style>
