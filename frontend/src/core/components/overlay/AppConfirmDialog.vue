<template>
  <AppModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :title="title"
    :description="description"
    max-width="md"
    :prevent-close="loading"
    :show-close-button="!loading"
  >
    <div v-if="$slots.default" class="py-2">
      <slot />
    </div>
    
    <template #footer>
      <AppButton
        variant="outline"
        @click="cancel"
        :disabled="loading"
        class="mt-2 sm:mt-0"
      >
        {{ cancelText }}
      </AppButton>
      <AppButton
        :variant="confirmVariant"
        @click="confirm"
        :loading="loading"
      >
        {{ confirmText }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from './AppModal.vue'
import AppButton from '../ui/AppButton.vue'

export interface AppConfirmDialogProps {
  modelValue: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'primary' | 'destructive'
  loading?: boolean
}

const props = withDefaults(defineProps<AppConfirmDialogProps>(), {
  modelValue: false,
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmVariant: 'primary',
  loading: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

function confirm() {
  emit('confirm')
}

function cancel() {
  if (!props.loading) {
    emit('update:modelValue', false)
    emit('cancel')
  }
}
</script>
