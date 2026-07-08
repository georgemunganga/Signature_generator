<script setup lang="ts">
import { useBranding } from '@/composables/useBranding'

const { companyName, logoLink, logoUrl } = useBranding()
const fileInputRef = ref<HTMLInputElement>()

function onChooseFile() {
  fileInputRef.value?.click()
}

function onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (!file)
    return

  const reader = new FileReader()

  reader.onload = () => {
    logoUrl.value = String(reader.result || '')
  }

  reader.readAsDataURL(file)
}

function onClearLogo() {
  logoUrl.value = ''
}
</script>

<template>
  <LayoutsDefault>
    <div class="space-y-6">
      <UiFieldForm
        label-position="top"
        class="rounded-md border bg-white p-5 shadow-xs"
      >
        <UiFieldFormItem
          label="Company name"
          description="Used in the app footer and as the default company identity."
        >
          <UiInput
            v-model="companyName"
            placeholder="Mighty Finance"
          />
        </UiFieldFormItem>
        <UiFieldFormItem
          label="Company logo"
          description="Use a public image URL for email-safe signatures, or upload an image to store it in this browser."
        >
          <div class="flex gap-2">
            <UiInput
              v-model="logoUrl"
              placeholder="https://example.com/logo.png"
            />
            <UiButton
              variant="outline"
              @click="onChooseFile"
            >
              Upload
            </UiButton>
            <UiButton
              variant="ghost"
              @click="onClearLogo"
            >
              Clear
            </UiButton>
          </div>
          <input
            ref="fileInputRef"
            class="hidden"
            type="file"
            accept="image/*"
            @change="onFileSelected"
          >
        </UiFieldFormItem>
        <UiFieldFormItem
          label="Logo link"
          description="This link is used when someone clicks the company logo or vertical website in the signature."
        >
          <UiInput
            v-model="logoLink"
            placeholder="https://www.mightyfinance.co.zm"
          />
        </UiFieldFormItem>
      </UiFieldForm>

      <div class="rounded-md border bg-white p-5 shadow-xs">
        <div class="mb-3 text-sm font-medium text-muted-foreground">
          Preview
        </div>
        <div class="flex h-28 items-center justify-center rounded-md border bg-secondary">
          <img
            v-if="logoUrl"
            :src="logoUrl"
            alt="Company logo preview"
            class="max-h-20 max-w-72 object-contain"
          >
          <div
            v-else
            class="text-sm text-muted-foreground"
          >
            No custom logo selected
          </div>
        </div>
      </div>
    </div>
  </LayoutsDefault>
</template>
