<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

import { useBranding } from '@/composables/useBranding'

const { init } = useSignatures()
const { companyName, logoUrl } = useBranding()

function updateFavicon(href: string) {
  let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')

  if (!favicon) {
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    document.head.appendChild(favicon)
  }

  favicon.href = href || '/favicon.ico'
}

function updateDocumentBranding() {
  updateFavicon(logoUrl.value)
  document.title = `${companyName.value || 'Company'} E-Signatures`
}

onMounted(() => {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('vueuse-color-scheme', 'light')
  init()
  updateDocumentBranding()
})

watch([logoUrl, companyName], updateDocumentBranding)
</script>

<template>
  <RouterView />
  <Toaster />
</template>
