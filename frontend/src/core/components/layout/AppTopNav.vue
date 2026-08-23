<template>
  <div class="relative z-10 flex-shrink-0 flex h-16 bg-background shadow-sm border-b border-border">
    <div class="flex-1 px-4 flex justify-between">
      <div class="flex-1 flex items-center">
        <!-- Mobile menu button placeholder -->
        <button type="button" class="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <Menu class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="ml-4 flex items-center md:ml-6 space-x-2">
        <!-- Notifications -->
        <button class="bg-background p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span class="sr-only">View notifications</span>
          <Bell class="h-5 w-5" aria-hidden="true" />
        </button>

        <!-- Profile dropdown placeholder -->
        <div class="ml-3 relative">
          <div>
            <button class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <span class="sr-only">Open user menu</span>
              <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                O
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bell, Menu } from 'lucide-vue-next'
</script>
