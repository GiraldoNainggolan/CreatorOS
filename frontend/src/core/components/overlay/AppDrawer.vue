<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" @click="closeOnBackdrop" />
    </Transition>

    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 flex max-w-full" :class="position === 'right' ? 'right-0' : 'left-0'">
          <Transition
            :enter-active-class="`transform transition ease-in-out duration-500 sm:duration-700`"
            :enter-from-class="position === 'right' ? 'translate-x-full' : '-translate-x-full'"
            :enter-to-class="`translate-x-0`"
            :leave-active-class="`transform transition ease-in-out duration-500 sm:duration-700`"
            :leave-from-class="`translate-x-0`"
            :leave-to-class="position === 'right' ? 'translate-x-full' : '-translate-x-full'"
          >
            <div 
              v-show="isShowingContent" 
              class="pointer-events-auto w-screen max-w-md h-full flex flex-col bg-background shadow-xl"
            >
              <div class="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-border">
                <h2 v-if="title" class="text-lg font-semibold leading-6 text-foreground" id="slide-over-title">
                  {{ title }}
                </h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    v-if="showCloseButton"
                    type="button"
                    class="relative rounded-md bg-background text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    @click="close"
                  >
                    <span class="absolute -inset-2.5" />
                    <span class="sr-only">Close panel</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              </div>
              
              <div class="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
                <slot />
              </div>
              
              <div v-if="$slots.footer" class="border-t border-border px-4 py-4 sm:px-6 flex justify-end gap-2">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

export interface AppDrawerProps {
  modelValue: boolean
  title?: string
  position?: 'left' | 'right'
  preventClose?: boolean
  showCloseButton?: boolean
}

const props = withDefaults(defineProps<AppDrawerProps>(), {
  modelValue: false,
  position: 'right',
  preventClose: false,
  showCloseButton: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

const isShowingContent = ref(props.modelValue)

function close() {
  if (!props.preventClose) {
    isShowingContent.value = false
    setTimeout(() => {
      emit('update:modelValue', false)
      emit('close')
    }, 300) // matches duration-300
  }
}

function closeOnBackdrop() {
  if (!props.preventClose) {
    close()
  }
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    isShowingContent.value = true
    document.body.style.overflow = 'hidden'
  } else {
    isShowingContent.value = false
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>
