<template>
  <div class="space-y-2" :class="$attrs.class">
    <label v-if="label" :for="id" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" :class="error ? 'text-destructive' : 'text-foreground'">
      {{ label }}
    </label>
    
    <textarea
      :id="id"
      ref="textareaRef"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :disabled="disabled"
      :rows="rows"
      :class="[
        'flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-ring',
        textareaClass
      ]"
      v-bind="textareaAttrs"
    />
    
    <p v-if="error" class="text-[0.8rem] font-medium text-destructive">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-[0.8rem] text-muted-foreground">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

export interface AppTextareaProps {
  modelValue?: string
  id?: string
  label?: string
  rows?: number
  error?: string
  hint?: string
  disabled?: boolean
  textareaClass?: string
}

withDefaults(defineProps<AppTextareaProps>(), {
  modelValue: '',
  id: () => `textarea-${Math.random().toString(36).substring(2, 9)}`,
  rows: 3,
  disabled: false
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const attrs = useAttrs()
const textareaAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)

defineExpose({
  focus: () => textareaRef.value?.focus()
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
