<script setup lang="ts">
import { useBranding } from '@/composables/useBranding'
import { normalizeUrl } from '@/utils'

const open = ref(false)
const { logoLink, logoUrl } = useBranding()

const headerLogo = computed(() => logoUrl.value || '/logo.svg')
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
    <div class="flex items-center gap-6">
      <UiDialog v-model:open="open">
        <UiDialogTrigger>
          <UiButton variant="link">
            Support MySigMail
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle>Made with ❤️, Powered by You</UiDialogTitle>
          </UiDialogHeader>
          <UiDialogDescription>
            MySigMail is built and maintained with love as an open-source project. If you find it
            useful, consider supporting us — your contribution helps us keep improving and building
            new features for the community.
          </UiDialogDescription>
          <div class="flex flex-col gap-2">
            <UiButton as-child>
              <a
                href="https://paypal.me/antongithub"
                target="_blank"
              > PayPal </a>
            </UiButton>
            <UiButton as-child>
              <a
                href="https://opencollective.com/masscode"
                target="_blank"
              > Open Collective </a>
            </UiButton>
          </div>
        </UiDialogContent>
      </UiDialog>
    </div>
  </div>
</template>
