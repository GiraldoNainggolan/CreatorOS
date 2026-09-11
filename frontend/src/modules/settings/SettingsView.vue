<template>
  <div class="max-w-4xl space-y-8 pb-16">
    <!-- Header -->
    <div class="border-b border-border pb-6">
      <h1 class="text-3xl font-bold tracking-tight text-foreground">Settings & Environments</h1>
      <p class="text-muted-foreground mt-1 text-sm">System parameters, local backend configuration, and service integrations.</p>
    </div>

    <!-- Integrations Status -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold tracking-tight text-foreground">Infrastructure Connections</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Supabase Cloud Card -->
        <AppCard class="p-5 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold text-sm">
                SB
              </div>
              <div>
                <h3 class="font-bold text-sm text-foreground">Supabase Authentication</h3>
                <p class="text-xs text-muted-foreground">Identity Provider & Session Vault</p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-semibold">
              Connected
            </span>
          </div>
          <div class="p-3 bg-secondary/50 rounded-md font-mono text-xs text-muted-foreground break-all">
            Endpoint: {{ supabaseHost }}
          </div>
          <p class="text-xs text-muted-foreground">
            Handles user login, session token validation, and secure route gating.
          </p>
        </AppCard>

        <!-- Local Laravel Backend Card -->
        <AppCard class="p-5 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600 font-bold text-sm">
                LV
              </div>
              <div>
                <h3 class="font-bold text-sm text-foreground">Local Laravel Backend</h3>
                <p class="text-xs text-muted-foreground">PHP 8.3 & Laragon MySQL</p>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 font-semibold">
              Local Dev Active
            </span>
          </div>
          <div class="p-3 bg-secondary/50 rounded-md font-mono text-xs text-muted-foreground">
            Host: 127.0.0.1:3306 (DB: laravel_tcos)
          </div>
          <p class="text-xs text-muted-foreground">
            Local service for batch data processing, scheduled pipelines, and background jobs.
          </p>
        </AppCard>
      </div>
    </div>

    <!-- Production Preferences Card -->
    <AppCard class="p-6 space-y-5">
      <h3 class="font-bold text-base text-foreground">Application Preferences</h3>
      <div class="space-y-4 text-sm divide-y divide-border/60">
        <div class="flex items-center justify-between pt-3">
          <div>
            <div class="font-medium text-foreground">Automatic 3-2-1 Backup Check</div>
            <div class="text-xs text-muted-foreground">Verify cold storage checksums during project archive</div>
          </div>
          <input type="checkbox" checked class="rounded border-border text-primary focus:ring-primary" />
        </div>

        <div class="flex items-center justify-between pt-3">
          <div>
            <div class="font-medium text-foreground">Strict Brand Voice Guard</div>
            <div class="text-xs text-muted-foreground">Flag banned vocabulary words before generating scripts</div>
          </div>
          <input type="checkbox" checked class="rounded border-border text-primary focus:ring-primary" />
        </div>

        <div class="flex items-center justify-between pt-3">
          <div>
            <div class="font-medium text-foreground">Analytics Daily Learning Loop</div>
            <div class="text-xs text-muted-foreground">Automatically digest high-performing post retention curves</div>
          </div>
          <input type="checkbox" checked class="rounded border-border text-primary focus:ring-primary" />
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppCard from '@/core/components/layout/AppCard.vue'

const supabaseHost = computed(() => {
  const url = import.meta.env.VITE_SUPABASE_URL || 'https://tdqhqqzpaglfoqcochwq.supabase.co'
  try {
    return new URL(url).hostname
  } catch {
    return 'supabase.co'
  }
})
</script>
