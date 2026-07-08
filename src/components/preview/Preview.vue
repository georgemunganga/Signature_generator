<script setup lang="ts"></script>

<template>
  <div class="mb-6">
    <PreviewHeader />
  </div>
  <div class="rounded-md border bg-white p-6 shadow-sm">
    <PreviewSkeleton />
    <PreviewSignature class="mt-6" />
  </div>
  <div class="flex justify-end mt-6">
    <PreviewFooter />
  </div>
</template>
