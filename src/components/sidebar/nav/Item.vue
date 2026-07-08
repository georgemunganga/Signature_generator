<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  name: string
  icon: Component
  isActive?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="px-2 py-1">
    <div
      class="flex min-h-14 flex-col items-center justify-center rounded-md px-2 py-2 text-center text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      :class="{
        '!bg-primary !text-primary-foreground shadow-xs': isActive,
      }"
    >
      <component
        :is="icon"
        class="w-5 h-5"
      />
      <div class="mt-1 text-[11px] font-medium leading-tight">
        {{ name }}
      </div>
    </div>
  </div>
</template>
