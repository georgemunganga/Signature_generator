<script setup lang="ts">
import { useBranding } from '@/composables/useBranding'

const { companyName } = useBranding()
</script>

<template>
  <div
    data-footer
    class="text-right text-xs text-muted-foreground"
  >
    Built for {{ companyName || 'your company' }}
  </div>
</template>
