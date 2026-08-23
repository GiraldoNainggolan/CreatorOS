<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col">
    <!-- Header & Controls -->
    <div class="mb-6 flex-shrink-0 space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-foreground">Content Pipeline</h1>
          <p class="text-muted-foreground mt-1">Manage your production workflow across all formats.</p>
        </div>
        <div class="flex items-center gap-3">
          <AppButton @click="$router.push('/generate')" class="gap-2 shadow-sm font-semibold">
            <Sparkles class="w-4 h-4" />
            Generate Content
          </AppButton>
        </div>
      </div>
      
      <!-- Filters -->
      <div class="flex flex-col sm:flex-row gap-3 items-center bg-card p-3 rounded-lg border border-border shadow-sm">
        <div class="relative flex-1 w-full">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search ideas, topics, or platforms..." 
            class="w-full bg-transparent border-none pl-9 pr-4 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        
        <div class="h-6 w-px bg-border hidden sm:block"></div>
        
        <div class="flex items-center gap-2 w-full sm:w-auto overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
          <AppBadge 
            v-for="platform in ['All', 'Instagram Reel', 'TikTok', 'YouTube Short', 'LinkedIn', 'Blog']" 
            :key="platform"
            @click="filterPlatform = platform"
            :variant="filterPlatform === platform ? 'default' : 'secondary'"
            class="cursor-pointer whitespace-nowrap"
          >
            {{ platform }}
          </AppBadge>
        </div>
      </div>
    </div>

    <!-- Kanban Board -->
    <div class="flex-1 overflow-x-auto custom-scrollbar">
      <div class="flex gap-4 h-full pb-4 items-start" style="min-width: max-content;">
        
        <!-- Column -->
        <div v-for="stage in stages" :key="stage" class="w-80 flex flex-col h-full bg-secondary/30 rounded-xl p-3 border border-border/50">
          <div class="flex items-center justify-between mb-3 pl-1 flex-shrink-0">
            <h3 class="font-bold text-sm text-foreground uppercase tracking-wider">{{ stage }}</h3>
            <AppBadge variant="secondary" class="font-mono text-xs">{{ getFilteredContentsByStage(stage).length }}</AppBadge>
          </div>
          
          <div class="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            <!-- Cards -->
            <AppCard 
              v-for="content in getFilteredContentsByStage(stage)" 
              :key="content.id"
              class="p-3 cursor-pointer hover:border-primary/50 transition-all shadow-sm group relative"
            >
              <!-- Move actions hover overlay -->
              <div class="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-card to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-2">
                 <button v-if="getPrevStage(stage)" @click.stop="moveContent(content, getPrevStage(stage)!)" class="p-1 bg-secondary text-secondary-foreground rounded hover:bg-primary hover:text-primary-foreground shadow-sm transition-colors">
                   <ChevronLeft class="w-3 h-3" />
                 </button>
                 <div v-else></div>
                 
                 <button v-if="getNextStage(stage)" @click.stop="moveContent(content, getNextStage(stage)!)" class="p-1 bg-secondary text-secondary-foreground rounded hover:bg-primary hover:text-primary-foreground shadow-sm transition-colors">
                   <ChevronRight class="w-3 h-3" />
                 </button>
                 <div v-else></div>
              </div>

              <div @click="$router.push(`/content/${content.id}`)">
                <div class="flex items-center justify-between mb-2">
                  <AppBadge variant="outline" class="text-[9px] px-1 py-0 border-primary/20 bg-primary/5 text-primary">{{ content.platform }}</AppBadge>
                  <span class="text-[10px] text-muted-foreground font-mono">{{ content.id.split('-').pop() }}</span>
                </div>
                <h4 class="font-semibold text-sm leading-snug mb-3 line-clamp-2">{{ content.title }}</h4>
                
                <div class="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">
                  <span class="flex items-center gap-1">
                    <Folder class="w-3 h-3" />
                    {{ content.audience.split(' ')[0] }}
                  </span>
                  <span v-if="content.status === 'PUBLISHED'" class="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 class="w-3 h-3" /> Done
                  </span>
                  <span v-else class="text-[10px] uppercase font-semibold">
                    {{ content.angle }}
                  </span>
                </div>
              </div>
            </AppCard>

            <!-- Empty State -->
            <div v-if="getFilteredContentsByStage(stage).length === 0" class="h-24 flex items-center justify-center border-2 border-dashed border-border/60 rounded-lg text-muted-foreground/60 text-xs font-medium">
              No items
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Sparkles, Folder, CheckCircle2, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ContentService } from '../../core/services/ContentService'
import type { ContentVariant, ContentStatus } from '../../core/types/tcos'
import AppButton from '../../core/components/ui/AppButton.vue'
import AppCard from '../../core/components/layout/AppCard.vue'
import AppBadge from '../../core/components/feedback/AppBadge.vue'
import { useToast } from '../../core/composables/useToast'

const { addToast } = useToast()
const contents = ref<ContentVariant[]>([])

const searchQuery = ref('')
const filterPlatform = ref('All')

// Focused subset of stages for UI density, as requested by user
const stages: ContentStatus[] = ['IDEA', 'SCRIPT', 'RECORDING', 'EDITING', 'READY', 'PUBLISHED']

const filteredContents = computed(() => {
  let result = contents.value
  
  if (filterPlatform.value !== 'All') {
    result = result.filter(c => c.platform === filterPlatform.value)
  }
  
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.id.toLowerCase().includes(q) ||
      c.platform.toLowerCase().includes(q) ||
      c.audience.toLowerCase().includes(q)
    )
  }
  
  return result
})

const getFilteredContentsByStage = (stage: string) => {
  return filteredContents.value.filter(c => c.status === stage).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

const getNextStage = (stage: ContentStatus): ContentStatus | null => {
  const idx = stages.indexOf(stage)
  return idx < stages.length - 1 ? stages[idx + 1] : null
}

const getPrevStage = (stage: ContentStatus): ContentStatus | null => {
  const idx = stages.indexOf(stage)
  return idx > 0 ? stages[idx - 1] : null
}

const moveContent = async (content: ContentVariant, newStage: ContentStatus) => {
  const updated = await ContentService.updateContentStatus(content.id, newStage)
  if (updated) {
    const index = contents.value.findIndex(c => c.id === content.id)
    if (index >= 0) {
      contents.value[index] = updated
    }
    addToast(`${content.id} moved to ${newStage}`, 'success')
  }
}

onMounted(async () => {
  contents.value = await ContentService.getPipelineContents()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 6px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: var(--color-muted-foreground);
}
</style>
