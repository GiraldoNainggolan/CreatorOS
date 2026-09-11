<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Good morning, Giraldo</h1>
        <p class="text-muted-foreground mt-1 text-lg">Let's turn your knowledge into content.</p>
      </div>
      <div class="flex items-center gap-3">
        <AppButton variant="outline" class="gap-2" @click="$router.push('/app/generate')">
          <Plus class="w-4 h-4" />
          New Idea
        </AppButton>
        <AppButton @click="$router.push('/app/generate')" class="gap-2 shadow-sm font-semibold">
          <Sparkles class="w-4 h-4" />
          Generate Content
        </AppButton>
      </div>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AppCard class="p-6 flex flex-col justify-center">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Eye class="w-4 h-4" />
          <span class="text-sm font-medium uppercase tracking-wider">Views</span>
        </div>
        <div class="text-3xl font-bold">{{ metrics.views }}</div>
      </AppCard>
      
      <AppCard class="p-6 flex flex-col justify-center">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Activity class="w-4 h-4" />
          <span class="text-sm font-medium uppercase tracking-wider">Engagement</span>
        </div>
        <div class="text-3xl font-bold text-primary">{{ metrics.engagement }}</div>
      </AppCard>

      <AppCard class="p-6 flex flex-col justify-center">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Users class="w-4 h-4" />
          <span class="text-sm font-medium uppercase tracking-wider">Followers</span>
        </div>
        <div class="text-3xl font-bold text-green-600">{{ metrics.followers }}</div>
      </AppCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Main Content Column -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Today's Production -->
        <AppCard class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold tracking-tight">Today's Production</h2>
            <AppButton variant="ghost" size="sm" @click="$router.push('/app/content')">View Pipeline →</AppButton>
          </div>
          
          <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div @click="$router.push('/app/content')" class="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
              <span class="text-2xl font-bold text-foreground">{{ pipelineCounts.ideas }}</span>
              <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Ideas</span>
            </div>
            <div @click="$router.push('/app/content')" class="flex flex-col items-center text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ pipelineCounts.scripts }}</span>
              <span class="text-xs font-semibold text-blue-600/70 dark:text-blue-400/70 uppercase tracking-wider mt-1">Scripts</span>
            </div>
            <div @click="$router.push('/app/content')" class="flex flex-col items-center text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
              <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ pipelineCounts.recording }}</span>
              <span class="text-xs font-semibold text-purple-600/70 dark:text-purple-400/70 uppercase tracking-wider mt-1">Recording</span>
            </div>
            <div @click="$router.push('/app/content')" class="flex flex-col items-center text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors">
              <span class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ pipelineCounts.editing }}</span>
              <span class="text-xs font-semibold text-orange-600/70 dark:text-orange-400/70 uppercase tracking-wider mt-1">Editing</span>
            </div>
            <div @click="$router.push('/app/content')" class="flex flex-col items-center text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
              <span class="text-2xl font-bold text-green-600 dark:text-green-400">{{ pipelineCounts.ready }}</span>
              <span class="text-xs font-semibold text-green-600/70 dark:text-green-400/70 uppercase tracking-wider mt-1">Ready</span>
            </div>
            <div @click="$router.push('/app/content')" class="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
              <span class="text-2xl font-bold text-foreground">{{ pipelineCounts.published }}</span>
              <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Published</span>
            </div>
          </div>
        </AppCard>

        <!-- Top Content -->
        <div>
          <h2 class="text-xl font-bold tracking-tight mb-4">Top Content (Based on State)</h2>
          <AppCard v-if="topContent" class="p-6 overflow-hidden relative cursor-pointer hover:border-primary/50 transition-colors" @click="$router.push(`/app/content/${topContent.id}`)">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            <div class="relative z-10">
              <div class="flex items-start justify-between">
                <div>
                  <AppBadge variant="secondary" class="mb-3">{{ topContent.platform }}</AppBadge>
                  <h3 class="text-xl font-bold mb-1">{{ topContent.title }}</h3>
                  <p class="text-muted-foreground text-sm">{{ topContent.audience }} • {{ topContent.angle }}</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-primary">High</div>
                  <div class="text-xs text-muted-foreground uppercase font-semibold">Priority</div>
                </div>
              </div>
              
              <div class="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <div class="text-xs text-muted-foreground uppercase font-semibold mb-1">Hook Strategy</div>
                  <div class="text-sm font-medium">{{ topContent.hookType }}</div>
                </div>
                <div>
                  <div class="text-xs text-muted-foreground uppercase font-semibold mb-1">Framework</div>
                  <div class="text-sm font-medium">{{ topContent.framework }}</div>
                </div>
              </div>
            </div>
          </AppCard>
          <div v-else class="text-muted-foreground">No top content available.</div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-8">
        
        <!-- Tasks -->
        <AppCard class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold tracking-tight">Today's Tasks</h2>
            <AppBadge variant="default" class="rounded-full w-6 h-6 p-0 flex items-center justify-center">{{ pendingTasks.length }}</AppBadge>
          </div>
          
          <div class="space-y-4">
            <div v-for="task in pendingTasks" :key="task.id" class="flex gap-4 group cursor-pointer" @click="toggleTaskStatus(task)">
              <div class="pt-1">
                <div 
                  class="w-5 h-5 rounded border-2 transition-colors flex items-center justify-center"
                  :class="task.status === 'Done' ? 'bg-primary border-primary' : 'border-muted-foreground/30 group-hover:border-primary'"
                >
                  <Check class="w-3 h-3 text-primary-foreground" v-if="task.status === 'Done'" />
                </div>
              </div>
              <div class="flex-1" :class="{'opacity-50 line-through': task.status === 'Done'}">
                <div class="flex items-center gap-2 mb-1">
                  <AppBadge 
                    :variant="task.type === 'Record' ? 'destructive' : task.type === 'Edit' ? 'warning' : 'secondary'" 
                    class="text-[10px] px-1.5 py-0"
                  >
                    {{ task.type }}
                  </AppBadge>
                  <span v-if="task.timeEstimate" class="text-xs text-muted-foreground flex items-center">
                    <Clock class="w-3 h-3 mr-1" /> {{ task.timeEstimate }}
                  </span>
                </div>
                <p class="text-sm font-medium text-foreground leading-tight">{{ task.title }}</p>
              </div>
            </div>
            <div v-if="pendingTasks.length === 0" class="text-sm text-muted-foreground text-center py-4">
              All caught up for today!
            </div>
          </div>
        </AppCard>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Sparkles, Eye, Activity, Users, Clock, Check } from 'lucide-vue-next'
import { ContentService } from '../../core/services/ContentService'
import type { Task, ContentVariant } from '../../core/types/tcos'
import AppButton from '../../core/components/ui/AppButton.vue'
import AppCard from '../../core/components/layout/AppCard.vue'
import AppBadge from '../../core/components/feedback/AppBadge.vue'

const metrics = ref({ views: '0', engagement: '0%', followers: '0' })
const pipelineCounts = ref({ ideas: 0, scripts: 0, recording: 0, editing: 0, ready: 0, published: 0 })
const tasks = ref<Task[]>([])
const topContent = ref<ContentVariant | null>(null)

const pendingTasks = computed(() => {
  // Return all tasks, sorting Done to bottom
  return [...tasks.value].sort((a, b) => {
    if (a.status === 'Done' && b.status !== 'Done') return 1;
    if (b.status === 'Done' && a.status !== 'Done') return -1;
    return 0;
  });
})

const toggleTaskStatus = async (task: Task) => {
  const newStatus = task.status === 'Done' ? 'Todo' : 'Done'
  await ContentService.updateTaskStatus(task.id, newStatus)
  // Optimistic update
  const t = tasks.value.find(t => t.id === task.id)
  if (t) t.status = newStatus
}

onMounted(async () => {
  const [metricsData, countsData, tasksData, topData] = await Promise.all([
    ContentService.getDashboardMetrics(),
    ContentService.getPipelineCounts(),
    ContentService.getTasks(),
    ContentService.getTopContent()
  ])
  
  metrics.value = metricsData as unknown as typeof metrics.value
  pipelineCounts.value = countsData as unknown as typeof pipelineCounts.value
  tasks.value = tasksData
  topContent.value = topData
})
</script>
