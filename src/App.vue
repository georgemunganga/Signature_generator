<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

const { init } = useSignatures()

onMounted(() => {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('vueuse-color-scheme', 'light')
  init()
})
</script>

<template>
  <RouterView />
  <Toaster />
</template>
