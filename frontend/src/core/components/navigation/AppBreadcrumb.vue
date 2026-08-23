<template>
  <nav aria-label="Breadcrumb" :class="$attrs.class">
    <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="inline-flex items-center gap-1.5"
      >
        <component
          :is="item.href ? 'router-link' : 'span'"
          :to="item.href"
          :class="[
            item.href ? 'transition-colors hover:text-foreground' : 'font-normal text-foreground',
            item.disabled ? 'pointer-events-none opacity-50' : ''
          ]"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
        >
          {{ item.label }}
        </component>
        
        <span v-if="index < items.length - 1" class="text-muted-foreground" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  href?: string
  disabled?: boolean
}

export interface AppBreadcrumbProps {
  items: BreadcrumbItem[]
}

defineProps<AppBreadcrumbProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
