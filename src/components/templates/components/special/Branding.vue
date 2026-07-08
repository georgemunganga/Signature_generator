<script setup lang="ts">
import * as Base from '@/components/templates/components/base'
import { useBranding } from '@/composables/useBranding'

const { companyName } = useBranding()
</script>

<template>
  <Base.Table width="auto">
    <tr>
      <td
        valign="top"
        style="border-top: 1px solid #ddd; padding-top: 5px"
      >
        <p style="margin: 0; font-size: 10px; font-family: 'Poppins', Arial, sans-serif">
          <span style="font-size: 10px; color: #888">Built for {{ companyName || 'your company' }}</span>
        </p>
      </td>
    </tr>
  </Base.Table>
</template>
