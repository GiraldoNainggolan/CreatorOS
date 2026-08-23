<template>
  <div>
    <!-- Backdrop -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity"
      @click="close"
    ></div>

    <!-- Command Palette Dialog -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 sm:px-6 pointer-events-none"
    >
      <div 
        class="w-full max-w-xl bg-card border border-border shadow-2xl rounded-xl overflow-hidden flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
        @click.stop
      >
        <!-- Search Input -->
        <div class="relative flex items-center px-4 border-b border-border">
          <Search class="w-5 h-5 text-muted-foreground mr-2" />
          <input
            ref="inputRef"
            v-model="query"
            class="flex-1 h-14 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground"
            placeholder="Type a command or search..."
            @keydown.down.prevent="selectNext"
            @keydown.up.prevent="selectPrev"
            @keydown.enter.prevent="executeSelected"
            @keydown.esc.prevent="close"
          />
          <kbd class="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground ml-2">
            ESC
          </kbd>
        </div>

        <!-- Results List -->
        <div class="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar" role="listbox">
          <div v-if="filteredGroups.length === 0" class="py-14 text-center text-sm text-muted-foreground">
            No results found.
          </div>
          
          <div v-for="(group, gIdx) in filteredGroups" :key="group.name" class="mb-4 last:mb-0">
            <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {{ group.name }}
            </div>
            
            <div 
              v-for="(item, iIdx) in group.items" 
              :key="item.id"
              class="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-colors"
              :class="isSelected(gIdx, iIdx) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'"
              @mouseenter="selectedIndex = getFlatIndex(gIdx, iIdx)"
              @click="executeItem(item)"
              role="option"
              :aria-selected="isSelected(gIdx, iIdx)"
            >
              <component :is="item.icon" class="w-4 h-4 opacity-70" />
              <div class="flex-1 flex items-center justify-between">
                <span class="text-sm font-medium">{{ item.title }}</span>
                <kbd v-if="item.shortcut" class="h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-50" :class="isSelected(gIdx, iIdx) ? 'border-primary-foreground text-primary-foreground' : 'border-border text-muted-foreground'">
                  {{ item.shortcut }}
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, type FunctionalComponent } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, 
  Sparkles, 
  LayoutDashboard, 
  KanbanSquare, 
  Settings,
  Lightbulb,
  Video,
  FileText,
  type LucideProps
} from 'lucide-vue-next'

const router = useRouter()

const isOpen = ref(false)
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const selectedIndex = ref(0)

type CommandItem = {
  id: string;
  title: string;
  icon: FunctionalComponent<LucideProps>;
  action: () => void;
  shortcut?: string;
}

type CommandGroup = {
  name: string;
  items: CommandItem[];
}

const commands: CommandGroup[] = [
  {
    name: 'Navigation',
    items: [
      { id: 'nav-dash', title: 'Dashboard', icon: LayoutDashboard, action: () => router.push('/') },
      { id: 'nav-gen', title: 'Generate Content', icon: Sparkles, shortcut: 'G', action: () => router.push('/generate') },
      { id: 'nav-pipe', title: 'Content Pipeline', icon: KanbanSquare, shortcut: 'P', action: () => router.push('/content') },
    ]
  },
  {
    name: 'Quick Actions',
    items: [
      { id: 'qa-idea', title: 'New Idea', icon: Lightbulb, action: () => router.push('/generate') },
      { id: 'qa-script', title: 'Draft Script', icon: FileText, action: () => router.push('/content') },
      { id: 'qa-video', title: 'Upload Recording', icon: Video, action: () => router.push('/content') },
    ]
  },
  {
    name: 'Settings',
    items: [
      { id: 'set-gen', title: 'General Settings', icon: Settings, action: () => {} },
      { id: 'set-theme', title: 'Toggle Dark Mode', icon: Settings, action: () => { document.documentElement.classList.toggle('dark') } },
    ]
  }
]

const filteredGroups = computed(() => {
  if (!query.value) return commands

  const q = query.value.toLowerCase()
  return commands.map(group => ({
    ...group,
    items: group.items.filter(item => item.title.toLowerCase().includes(q))
  })).filter(group => group.items.length > 0)
})

const flatItems = computed(() => {
  return filteredGroups.value.flatMap(g => g.items)
})

watch(query, () => {
  selectedIndex.value = 0
})

const getFlatIndex = (gIdx: number, iIdx: number) => {
  let idx = 0
  for (let i = 0; i < gIdx; i++) {
    idx += filteredGroups.value[i].items.length
  }
  return idx + iIdx
}

const isSelected = (gIdx: number, iIdx: number) => {
  return selectedIndex.value === getFlatIndex(gIdx, iIdx)
}

const selectNext = () => {
  if (selectedIndex.value < flatItems.value.length - 1) {
    selectedIndex.value++
  } else {
    selectedIndex.value = 0
  }
}

const selectPrev = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  } else {
    selectedIndex.value = flatItems.value.length - 1
  }
}

const executeSelected = () => {
  if (flatItems.value.length > 0 && flatItems.value[selectedIndex.value]) {
    executeItem(flatItems.value[selectedIndex.value])
  }
}

const executeItem = (item: CommandItem) => {
  close()
  item.action()
}

const open = () => {
  isOpen.value = true
  query.value = ''
  selectedIndex.value = 0
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const close = () => {
  isOpen.value = false
}

// Global keyboard shortcut (Cmd+K / Ctrl+K)
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}
</style>
