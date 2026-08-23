<template>
  <div class="max-w-3xl mx-auto pb-24 pt-8">
    
    <!-- Wizard Header -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Sparkles class="w-7 h-7 text-primary" />
          Content Generator
        </h1>
        <div class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Step {{ currentStep }} of {{ totalSteps }}
        </div>
      </div>
      
      <!-- Progress Bar -->
      <div class="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div class="h-full bg-primary transition-all duration-300" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="bg-card border border-border shadow-sm rounded-xl p-6 md:p-8 min-h-[400px] flex flex-col relative">
      
      <!-- Step 1: Core Topic -->
      <div v-if="currentStep === 1" class="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        <div>
          <h2 class="text-2xl font-bold mb-2">What do you want to talk about?</h2>
          <p class="text-muted-foreground">Define the core subject of your content.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Content Pillar</label>
            <AppSelect v-model="request.pillar" :options="[{label: 'Software Engineering', value: 'Software Engineering'}, {label: 'Career', value: 'Career'}, {label: 'Business', value: 'Business'}, {label: 'Lifestyle', value: 'Lifestyle'}]" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Category</label>
            <AppSelect v-model="request.category" :options="[{label: 'PHP', value: 'PHP'}, {label: 'JavaScript', value: 'JavaScript'}, {label: 'Architecture', value: 'Architecture'}, {label: 'Mindset', value: 'Mindset'}]" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Specific Topic</label>
            <AppInput v-model="request.topic" placeholder="e.g., Laravel Middleware" class="text-lg" />
          </div>
        </div>
      </div>

      <!-- Step 2: Audience -->
      <div v-if="currentStep === 2" class="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        <div>
          <h2 class="text-2xl font-bold mb-2">Who is this for?</h2>
          <p class="text-muted-foreground">Select the primary audience to tailor the language and complexity.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          <div 
            v-for="aud in ['Mahasiswa IT', 'Junior Developer', 'Freelancer', 'Tech Enthusiast', 'Senior Engineer', 'CTO / Founders']" 
            :key="aud"
            @click="request.audience = aud"
            :class="[
              request.audience === aud ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50',
              'border rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between'
            ]"
          >
            <span class="font-medium">{{ aud }}</span>
            <div v-if="request.audience === aud" class="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div v-else class="w-4 h-4 rounded-full border-2 border-muted"></div>
          </div>
        </div>
      </div>

      <!-- Step 3: Angle -->
      <div v-if="currentStep === 3" class="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        <div>
          <h2 class="text-2xl font-bold mb-2">What is the angle?</h2>
          <p class="text-muted-foreground">How do you want to present this topic?</p>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mt-6">
          <div 
            v-for="ang in angles" 
            :key="ang"
            @click="request.angle = ang as any"
            :class="[
              request.angle === ang ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50',
              'border rounded-lg p-4 text-center cursor-pointer transition-all'
            ]"
          >
            <span class="font-medium text-sm">{{ ang }}</span>
          </div>
        </div>
      </div>

      <!-- Step 4: Hooks -->
      <div v-if="currentStep === 4" class="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        <div>
          <h2 class="text-2xl font-bold mb-2">Choose your Hook</h2>
          <p class="text-muted-foreground">The AI has drafted a few hooks based on your topic and angle.</p>
        </div>
        
        <div v-if="isGeneratingHooks" class="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
          <Loader2 class="w-10 h-10 animate-spin text-primary" />
          <p class="text-muted-foreground font-medium animate-pulse">Drafting engaging hooks...</p>
        </div>
        
        <div v-else-if="hooks.length > 0" class="space-y-3 mt-4">
          <div 
            v-for="(hook, idx) in hooks" 
            :key="idx"
            @click="selectedHookText = hook; request.hookType = 'Mistake'"
            :class="[
              selectedHookText === hook ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50',
              'border rounded-lg p-5 cursor-pointer transition-all text-sm leading-relaxed'
            ]"
          >
            "{{ hook }}"
          </div>
          
          <div class="pt-4 text-center">
             <AppButton variant="ghost" size="sm" @click="generateHooks" class="gap-2 text-muted-foreground hover:text-foreground">
               <RefreshCw class="w-4 h-4" /> Generate More Options
             </AppButton>
          </div>
        </div>
        
        <div v-else class="h-40 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
           <AppButton variant="primary" @click="generateHooks" class="gap-2">
             <Sparkles class="w-4 h-4" /> Generate Hooks
           </AppButton>
        </div>
      </div>

      <!-- Step 5: Framework & Formats -->
      <div v-if="currentStep === 5" class="space-y-8 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        <div>
          <h2 class="text-2xl font-bold mb-2">Final Details</h2>
          <p class="text-muted-foreground">Select framework and output formats.</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">Framework</label>
          <AppSelect v-model="request.framework" :options="[{label: 'PAS (Problem-Agitate-Solve)', value: 'PAS'}, {label: 'AIDA (Attention-Interest-Desire-Action)', value: 'AIDA'}, {label: 'BAB (Before-After-Bridge)', value: 'BAB'}, {label: 'Before-After-How', value: 'Before-After-How'}, {label: 'Story-Lesson-CTA', value: 'Story-Lesson-CTA'}]" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-3 uppercase tracking-wider text-muted-foreground">Output Formats</label>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="plat in platforms" 
              :key="plat"
              @click="togglePlatform(plat)"
              :class="[
                request.formats.includes(plat as any) ? 'bg-foreground text-background shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                'px-4 py-2 rounded-full text-sm font-medium transition-all'
              ]"
            >
              {{ plat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Step 6: Review -->
      <div v-if="currentStep === 6" class="space-y-6 flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
        <div v-if="!isGenerating">
          <h2 class="text-2xl font-bold mb-2">Review Generator Request</h2>
          <p class="text-muted-foreground">Review your choices before starting the generation process.</p>
          
          <div class="bg-secondary/30 rounded-xl p-6 mt-6 space-y-4">
            <div class="grid grid-cols-3 border-b border-border pb-4">
              <span class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Topic</span>
              <span class="col-span-2 font-medium">{{ request.topic }}</span>
            </div>
            <div class="grid grid-cols-3 border-b border-border pb-4">
              <span class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Audience</span>
              <span class="col-span-2 font-medium">{{ request.audience }}</span>
            </div>
            <div class="grid grid-cols-3 border-b border-border pb-4">
              <span class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Angle & Hook</span>
              <span class="col-span-2 font-medium"><span class="italic text-muted-foreground">[{{ request.angle }}]</span> "{{ selectedHookText }}"</span>
            </div>
            <div class="grid grid-cols-3">
              <span class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Formats</span>
              <span class="col-span-2 font-medium flex gap-2 flex-wrap">
                <AppBadge v-for="f in request.formats" :key="f" variant="outline">{{ f }}</AppBadge>
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="flex-1 flex flex-col items-center justify-center space-y-6 py-16">
          <div class="relative">
             <div class="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
             <Loader2 class="w-16 h-16 animate-spin text-primary relative z-10" />
          </div>
          <div class="text-center">
             <h3 class="text-xl font-bold mb-2">Building your Content Ecosystem</h3>
             <p class="text-muted-foreground text-sm max-w-sm mx-auto">Drafting hooks, scripting {{ request.formats.join(' & ') }}, and preparing your workspace...</p>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="mt-8 pt-6 border-t border-border flex items-center justify-between" v-if="!isGenerating">
        <AppButton variant="outline" @click="prevStep" :disabled="currentStep === 1">Back</AppButton>
        
        <AppButton v-if="currentStep < totalSteps" @click="nextStep" :disabled="!isStepValid(currentStep)">Next Step</AppButton>
        <AppButton v-else @click="handleGenerate" class="gap-2 font-bold px-8 shadow-md">
          <Sparkles class="w-4 h-4" /> Generate Workspace
        </AppButton>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Sparkles, RefreshCw, Loader2 } from 'lucide-vue-next'
import { GeneratorService } from '../../core/services/GeneratorService'
import { ContentService } from '../../core/services/ContentService'
import { useToast } from '../../core/composables/useToast'
import type { GeneratorRequest, ContentPlatform } from '../../core/types/tcos'

import AppButton from '../../core/components/ui/AppButton.vue'
import AppInput from '../../core/components/ui/AppInput.vue'
import AppSelect from '../../core/components/ui/AppSelect.vue'
import AppBadge from '../../core/components/feedback/AppBadge.vue'

const router = useRouter()
const { addToast } = useToast()

const currentStep = ref(1)
const totalSteps = 6

const angles = ['Education', 'Entertainment', 'Storytelling', 'Controversial', 'Case Study', 'Tutorial', 'Comparison', 'Mistake', 'Opinion', 'Review']
const platforms = ['Instagram Reel', 'TikTok', 'YouTube Short', 'LinkedIn', 'Carousel', 'Blog']

const request = ref<GeneratorRequest>({
  pillar: 'Software Engineering',
  category: 'PHP',
  topic: '',
  audience: 'Junior Developer',
  angle: 'Education',
  hookType: 'Curiosity',
  framework: 'PAS',
  formats: ['Instagram Reel'],
  ctaType: 'Comment'
})

const hooks = ref<string[]>([])
const selectedHookText = ref('')
const isGeneratingHooks = ref(false)
const isGenerating = ref(false)

const isStepValid = (step: number) => {
  switch (step) {
    case 1: return !!request.value.topic
    case 2: return !!request.value.audience
    case 3: return !!request.value.angle
    case 4: return !!selectedHookText.value
    case 5: return request.value.formats.length > 0 && !!request.value.framework
    default: return true
  }
}

const togglePlatform = (plat: string) => {
  const idx = request.value.formats.indexOf(plat as ContentPlatform)
  if (idx > -1) {
    if (request.value.formats.length > 1) {
      request.value.formats.splice(idx, 1)
    }
  } else {
    request.value.formats.push(plat as ContentPlatform)
  }
}

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
    // Auto-generate hooks when entering step 4 if none exist
    if (currentStep.value === 4 && hooks.value.length === 0) {
      generateHooks()
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const generateHooks = async () => {
  isGeneratingHooks.value = true
  selectedHookText.value = ''
  // Use mock generation based on topic
  hooks.value = await GeneratorService.generateHooks(request.value.topic, request.value.angle)
  isGeneratingHooks.value = false
}

const handleGenerate = async () => {
  isGenerating.value = true
  
  // 1. Generate the raw content variant via AI service
  const res = await GeneratorService.generateContent(request.value)
  res.script.hook = selectedHookText.value
  
  // 2. Persist it via ContentService -> LocalRepository
  const savedVariant = await ContentService.saveGeneratedContent(res, request.value)
  
  isGenerating.value = false
  addToast('Content workspace successfully created!', 'success')
  
  // 3. Immediately redirect to workspace
  router.push(`/content/${savedVariant.id}`)
}
</script>
