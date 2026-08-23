<template>
  <div class="flex items-center space-x-2" :class="$attrs.class">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      :id="id"
      @click="toggle"
      :class="[
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        modelValue ? 'bg-primary' : 'bg-input',
        switchClass
      ]"
      v-bind="buttonAttrs"
    >
      <span
        :class="[
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
          modelValue ? 'translate-x-4' : 'translate-x-0'
        ]"
      />
    </button>
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      @click.prevent="toggle"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

export interface AppSwitchProps {
  modelValue?: boolean
  id?: string
  label?: string
  disabled?: boolean
  switchClass?: string
}

const props = withDefaults(defineProps<AppSwitchProps>(), {
  modelValue: false,
  id: () => `switch-${Math.random().toString(36).substring(2, 9)}`,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const attrs = useAttrs()
const buttonAttrs = computed(() => {
  const { class: _, ...rest } = attrs
  return rest
})

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
