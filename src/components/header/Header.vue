<script setup lang="ts">
import { useBranding } from '@/composables/useBranding'
import { normalizeUrl } from '@/utils'

const { logoLink, logoUrl } = useBranding()

const headerLogo = computed(() => logoUrl.value || '/assets/mighty-fin-logo.png')
const headerLogoLink = computed(() =>
  normalizeUrl(logoLink.value || 'https://www.mightyfinance.co.zm'),
)
</script>

<template>
  <div
    data-header
    class="flex items-center justify-between bg-white/95 px-4 py-3 pr-6 shadow-xs"
  >
    <a
      :href="headerLogoLink"
      target="_blank"
      rel="noreferrer"
      class="flex w-[var(--sidebar-width)] items-center"
    >
      <img
        :src="headerLogo"
        alt="Company logo"
        class="max-h-8 max-w-[64px] object-contain"
      >
    </a>
    <div />
  </div>
</template>
