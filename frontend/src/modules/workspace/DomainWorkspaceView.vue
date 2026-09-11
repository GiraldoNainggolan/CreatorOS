<template>
  <div class="space-y-8 pb-16">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <AppBadge variant="secondary" class="font-mono text-xs">{{ domain.code }}</AppBadge>
          <AppBadge variant="outline" class="text-xs uppercase tracking-wider">{{ domain.category }}</AppBadge>
          <span class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <ShieldCheck class="w-3.5 h-3.5" /> Source of Truth Verified
          </span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-foreground">{{ domain.title }}</h1>
        <p class="text-muted-foreground mt-1 max-w-3xl text-sm leading-relaxed">{{ domain.description }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2.5">
        <AppButton 
          v-for="(act, idx) in domain.actions" 
          :key="idx" 
          :variant="act.primary ? 'primary' : 'outline'"
          size="sm"
          class="gap-1.5 shadow-sm"
          @click="triggerAction(act.label)"
        >
          <Sparkles v-if="act.primary" class="w-3.5 h-3.5" />
          {{ act.label }}
        </AppButton>
      </div>
    </div>

    <!-- Domain Metrics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <AppCard v-for="(metric, idx) in domain.metrics" :key="idx" class="p-4 bg-card/60 backdrop-blur-sm">
        <div class="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{{ metric.label }}</div>
        <div class="text-2xl font-bold text-foreground">{{ metric.value }}</div>
      </AppCard>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-3 items-center bg-card p-3 rounded-lg border border-border shadow-sm">
      <div class="relative flex-1 w-full">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="`Search ${domain.title.toLowerCase()} records, rules, or metadata...`" 
          class="w-full bg-transparent border-none pl-9 pr-4 py-1.5 text-sm outline-none placeholder:text-muted-foreground text-foreground"
        />
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <AppBadge 
          v-for="cat in availableCategories" 
          :key="cat"
          @click="selectedCategory = cat"
          :variant="selectedCategory === cat ? 'default' : 'secondary'"
          class="cursor-pointer whitespace-nowrap text-xs"
        >
          {{ cat }}
        </AppBadge>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Records Column (2 cols) -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers class="w-4 h-4 text-primary" /> Active Domain Assets & Records ({{ filteredItems.length }})
          </h2>
          <span class="text-xs text-muted-foreground">Canonical Level 1 Evidence</span>
        </div>

        <div v-if="filteredItems.length === 0" class="p-8 text-center bg-card rounded-lg border border-border">
          <p class="text-sm text-muted-foreground">No records matched your search query.</p>
        </div>

        <div v-for="item in filteredItems" :key="item.id" class="p-5 bg-card rounded-xl border border-border hover:border-primary/40 transition-all shadow-sm space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <AppBadge variant="outline" class="font-mono text-xs">{{ item.id }}</AppBadge>
              <h3 class="font-bold text-base text-foreground">{{ item.title }}</h3>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary self-start sm:self-auto">
              {{ item.status }}
            </span>
          </div>

          <p v-if="item.subtitle" class="text-sm text-muted-foreground">{{ item.subtitle }}</p>

          <!-- Metadata Badges -->
          <div v-if="item.metadata" class="flex flex-wrap gap-2 pt-1">
            <span 
              v-for="(val, key) in item.metadata" 
              :key="key" 
              class="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-secondary/70 text-secondary-foreground font-mono"
            >
              <span class="text-muted-foreground">{{ key }}:</span>
              <span class="font-semibold">{{ val }}</span>
            </span>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-border/60 text-xs text-muted-foreground">
            <div class="flex items-center gap-2">
              <span v-for="t in item.tags" :key="t" class="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                #{{ t }}
              </span>
            </div>
            <span v-if="item.date" class="flex items-center gap-1">
              <Clock class="w-3.5 h-3.5" /> {{ item.date }}
            </span>
          </div>
        </div>
      </div>

      <!-- Guidelines & SOP Sidebar (1 col) -->
      <div class="space-y-6">
        <!-- Guidelines Card -->
        <AppCard class="p-5 space-y-4 bg-card">
          <div class="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <FileText class="w-4 h-4" /> Operational Guidelines
          </div>
          <ul class="space-y-3 text-xs text-foreground/90 leading-relaxed">
            <li v-for="(rule, idx) in domain.guidelines" :key="idx" class="flex items-start gap-2">
              <span class="text-emerald-500 font-bold shrink-0">✓</span>
              <span>{{ rule }}</span>
            </li>
          </ul>
        </AppCard>

        <!-- Checklists Card -->
        <AppCard class="p-5 space-y-4 bg-card">
          <div class="flex items-center gap-2 text-foreground font-bold text-sm uppercase tracking-wider">
            <CheckCircle2 class="w-4 h-4 text-emerald-500" /> Quality Gate Checklist
          </div>
          <div class="space-y-2.5">
            <label 
              v-for="(chk, idx) in domain.checklists" 
              :key="idx" 
              class="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              <input type="checkbox" checked class="mt-0.5 rounded border-border text-primary focus:ring-primary" />
              <span>{{ chk }}</span>
            </label>
          </div>
        </AppCard>

        <!-- Knowledge Origin & Source Traceability -->
        <div class="p-4 rounded-lg bg-secondary/50 border border-border text-xs space-y-2">
          <div class="font-bold text-foreground">Knowledge Traceability</div>
          <div class="text-muted-foreground font-mono text-[11px] break-all">{{ domain.knowledgePath }}</div>
          <div class="text-muted-foreground leading-relaxed">
            SOP Level 1 authoritative source. Rules are preserved in governance without arbitrary modifications.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Search, 
  Clock, 
  FileText, 
  CheckCircle2 
} from 'lucide-vue-next'
import AppCard from '@/core/components/layout/AppCard.vue'
import AppButton from '@/core/components/ui/AppButton.vue'
import AppBadge from '@/core/components/feedback/AppBadge.vue'
import { domainRegistry, type DomainConfig } from './domainData'

const route = useRoute()

const domainKey = computed(() => {
  const param = String(route.params.domain || '').toLowerCase()
  return domainRegistry[param] ? param : 'archive'
})

const domain = computed<DomainConfig>(() => {
  return domainRegistry[domainKey.value] || domainRegistry['archive']
})

const searchQuery = ref('')
const selectedCategory = ref('All')

const availableCategories = computed(() => {
  const cats = new Set<string>(['All'])
  domain.value.items.forEach(i => {
    if (i.category) cats.add(i.category)
  })
  return Array.from(cats)
})

const filteredItems = computed(() => {
  let list = domain.value.items
  if (selectedCategory.value !== 'All') {
    list = list.filter(i => i.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(i => 
      i.title.toLowerCase().includes(q) ||
      (i.subtitle && i.subtitle.toLowerCase().includes(q)) ||
      (i.tags && i.tags.some(t => t.toLowerCase().includes(q))) ||
      i.id.toLowerCase().includes(q)
    )
  }
  return list
})

function triggerAction(label: string) {
  // Action feedback
  console.info(`Triggered domain action: ${label} for ${domain.value.code}`)
}
</script>
