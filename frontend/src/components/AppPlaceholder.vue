<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-4">
    <div class="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground">
      <Compass class="w-7 h-7" />
    </div>
    <div class="space-y-1.5 max-w-md">
      <h2 class="text-2xl font-bold tracking-tight text-foreground">Page Not Found</h2>
      <p class="text-sm text-muted-foreground">
        The requested application view does not exist or has been moved.
      </p>
    </div>
    <div class="pt-2">
      <AppButton @click="$router.push('/app')" class="gap-2">
        <ArrowLeft class="w-4 h-4" />
        Return to Dashboard
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Compass, ArrowLeft } from 'lucide-vue-next'
import AppButton from '@/core/components/ui/AppButton.vue'
</script>
