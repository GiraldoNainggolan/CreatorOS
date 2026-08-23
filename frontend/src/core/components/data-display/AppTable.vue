<template>
  <div class="relative w-full overflow-auto">
    <table class="w-full caption-bottom text-sm">
      <thead class="[&_tr]:border-b">
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th 
            v-for="col in columns" 
            :key="String(col.key)"
            class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            :class="col.class"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0">
        <template v-if="data.length > 0">
          <tr 
            v-for="(row, index) in data" 
            :key="index"
            class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td 
              v-for="col in columns" 
              :key="String(col.key)"
              class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
              :class="col.class"
            >
              <slot :name="`cell(${String(col.key)})`" :row="row" :value="row[col.key as keyof typeof row]">
                {{ row[col.key as keyof typeof row] }}
              </slot>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="columns.length" class="p-4 text-center align-middle text-muted-foreground">
            <slot name="empty">No results found.</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string
  label: string
  class?: string
}

export interface AppTableProps {
  columns: TableColumn[]
  data: Record<string, unknown>[]
}

defineProps<AppTableProps>()
</script>
