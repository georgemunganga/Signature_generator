<script setup lang="ts"></script>

<template>
  <div
    data-layout-default
    class="h-screen grid grid-cols-[85px_550px_1fr] grid-rows-[56px_1fr] bg-background"
  >
    <Header class="col-span-3 border-b" />
    <Sidebar class="border-r overflow-y-auto" />
    <div
      data-main
      class="overflow-y-auto px-6 py-5"
    >
      <div class="mb-4">
        <h1 class="text-2xl font-semibold leading-thin mb-2">
          {{ $route.meta.title }}
        </h1>
        <p
          v-if="$route.meta.description"
          class="text-sm text-muted-foreground"
        >
          {{ $route.meta.description }}
        </p>
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div
      data-preview
      class="overflow-y-auto bg-[#f3f5f8] p-6"
    >
      <Preview />
    </div>
  </div>
</template>
