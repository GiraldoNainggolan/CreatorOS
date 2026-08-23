<template>
  <div :class="$attrs.class">
    <div class="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        role="tab"
        :aria-selected="modelValue === tab.value"
        :disabled="tab.disabled"
        @click="selectTab(tab.value)"
        :class="[
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          modelValue === tab.value ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50 hover:text-foreground'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  label: string
  value: string | number
  disabled?: boolean
}

export interface AppTabsProps {
  modelValue: string | number
  tabs: TabItem[]
}

defineProps<AppTabsProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

function selectTab(value: string | number) {
  emit('update:modelValue', value)
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
