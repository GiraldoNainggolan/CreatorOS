<template>
  <div class="flex items-center space-x-2" :class="$attrs.class">
    <button
      type="button"
      role="checkbox"
      :aria-checked="modelValue"
      :disabled="disabled"
      :id="id"
      @click="toggle"
      :class="[
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        modelValue ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        checkboxClass
      ]"
      v-bind="buttonAttrs"
    >
      <span v-if="modelValue" class="flex items-center justify-center text-current">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
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

export interface AppCheckboxProps {
  modelValue?: boolean
  id?: string
  label?: string
  disabled?: boolean
  checkboxClass?: string
}

const props = withDefaults(defineProps<AppCheckboxProps>(), {
  modelValue: false,
  id: () => `checkbox-${Math.random().toString(36).substring(2, 9)}`,
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
