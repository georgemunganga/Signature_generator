<script setup lang="ts">
import { useBranding } from '@/composables/useBranding'
import { normalizeUrl } from '@/utils'

import * as Addons from './components/addons'
import * as Main from './components/main'

const { installed, isAddonTool, options, socials } = useSignatures()
const { logoLink, logoUrl } = useBranding()

const DEFAULT_PURPLE = '#663092'
const DEFAULT_GOLD = '#ffc00e'
const DEFAULT_TEXT = '#242124'

const fieldByLabel = computed(() => {
  return installed.value.tools.basic.reduce<Record<string, string>>((acc, field) => {
    acc[field.label.toLowerCase()] = field.value
    return acc
  }, {})
})

const basicFields = computed(() =>
  installed.value.tools.basic.filter(field => field.type !== 'image'),
)

const name = computed(() => {
  return (
    fieldByLabel.value['full name'] || fieldByLabel.value.name || basicFields.value[0]?.value || ''
  )
})
const title = computed(() => {
  return (
    fieldByLabel.value['job title'] || fieldByLabel.value.title || basicFields.value[1]?.value || ''
  )
})
const phone = computed(() => {
  return (
    fieldByLabel.value.phone
    || basicFields.value.find(field => field.type === 'phone')?.value
    || ''
  )
})
const address = computed(() => {
  return (
    fieldByLabel.value.address || fieldByLabel.value.company || basicFields.value[2]?.value || ''
  )
})
const addressLines = computed(() => address.value.split('\n'))
const website = computed(() => {
  const value = logoLink.value || fieldByLabel.value.website || 'https://www.mightyfinance.co.zm'
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '')
})
const companyLogo = computed(() => {
  return logoUrl.value || '/assets/mighty-fin-logo.png'
})

const extraFields = computed(() => {
  const used = new Set([
    name.value,
    title.value,
    phone.value,
    address.value,
    fieldByLabel.value.website,
  ])

  return basicFields.value.filter((field) => {
    return field.value && !used.has(field.value)
  })
})

const mainColor = computed(() => options.value.mainColor || DEFAULT_PURPLE)
const secondaryColor = computed(() => options.value.secondaryColor || DEFAULT_GOLD)
const bgColor = computed(() => options.value.bgColor || DEFAULT_PURPLE)
const textColor = DEFAULT_TEXT
const fontFamily = computed(
  () => options.value.fontFamily || '\'Montserrat\', Arial, Helvetica, sans-serif',
)
const fontScale = computed(() => options.value.fontSize / 12)

function scaledPx(size: number) {
  return `${Math.round(size * fontScale.value * 100) / 100}px`
}
</script>

<template>
  <table
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    width="550"
    style="
      width: 550px;
      border-collapse: collapse;
      border-spacing: 0;
      background: #ffffff;
      margin: 0;
    "
  >
    <tbody>
      <tr>
        <td
          width="347"
          height="157"
          valign="top"
          style="width: 347px; height: 157px; padding: 20px 0 0 43px; box-sizing: border-box"
        >
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            role="presentation"
            style="border-collapse: collapse; border-spacing: 0; margin: 0"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 0 0 13px 0;
                    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                    font-size: 20px;
                    line-height: 1;
                    font-weight: 400;
                    letter-spacing: 0;
                  "
                  :style="{ color: mainColor, fontFamily, fontSize: scaledPx(20) }"
                >
                  {{ name }}
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 0 0 11px 0;
                    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                    font-size: 15px;
                    line-height: 1;
                    font-weight: 500;
                    letter-spacing: 0;
                  "
                  :style="{ color: secondaryColor, fontFamily, fontSize: scaledPx(15) }"
                >
                  {{ title }}
                </td>
              </tr>
              <tr>
                <td style="padding: 0">
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    role="presentation"
                    style="border-collapse: collapse; border-spacing: 0; margin: 0"
                  >
                    <tbody>
                      <tr>
                        <td
                          valign="top"
                          style="
                            padding: 0 8px 7px 2px;
                            font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                            font-size: 15px;
                            line-height: 1;
                            font-weight: 700;
                          "
                          :style="{ color: mainColor, fontFamily, fontSize: scaledPx(15) }"
                        >
                          P:
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 0 0 7px 0;
                            font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                            font-size: 15px;
                            line-height: 1;
                            font-weight: 400;
                            color: #242124;
                          "
                          :style="{ color: textColor, fontFamily, fontSize: scaledPx(15) }"
                        >
                          <a
                            :href="`tel:${phone}`"
                            :style="{ color: textColor, textDecoration: 'none' }"
                          >{{ phone }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          style="
                            padding: 0 8px 0 2px;
                            font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                            font-size: 15px;
                            line-height: 1;
                            font-weight: 700;
                          "
                          :style="{ color: mainColor, fontFamily, fontSize: scaledPx(15) }"
                        >
                          A:
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 0;
                            font-family: 'Montserrat', Arial, Helvetica, sans-serif;
                            font-size: 15px;
                            line-height: 1.35;
                            font-weight: 400;
                            color: #242124;
                          "
                          :style="{ color: textColor, fontFamily, fontSize: scaledPx(15) }"
                        >
                          <span
                            v-for="line in addressLines"
                            :key="line"
                            style="display: block"
                          >{{
                            line
                          }}</span>
                        </td>
                      </tr>
                      <tr
                        v-for="field in extraFields"
                        :key="field.id || field.label"
                      >
                        <td
                          valign="top"
                          style="
                            padding: 4px 8px 0 2px;
                            font-size: 12px;
                            line-height: 1.2;
                            font-weight: 700;
                          "
                          :style="{ color: mainColor, fontFamily, fontSize: scaledPx(12) }"
                        >
                          {{ field.label ? `${field.label.charAt(0)}:` : '' }}
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 4px 0 0 0;
                            font-size: 12px;
                            line-height: 1.2;
                            font-weight: 400;
                          "
                          :style="{ color: textColor, fontFamily, fontSize: scaledPx(12) }"
                        >
                          <a
                            v-if="field.type !== 'text'"
                            :href="
                              field.type === 'email'
                                ? `mailto:${field.value}`
                                : normalizeUrl(field.value)
                            "
                            :style="{ color: textColor, textDecoration: 'none' }"
                          >{{ field.value }}</a>
                          <span v-else>{{ field.value }}</span>
                        </td>
                      </tr>
                      <tr v-if="socials.length">
                        <td
                          colspan="2"
                          style="padding: 8px 0 0 2px"
                        >
                          <Main.Social />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td
          width="158"
          height="157"
          valign="middle"
          align="center"
          style="width: 158px; height: 157px; padding: 0"
        >
          <img
            :src="companyLogo"
            alt="mighty fin"
            width="157"
            style="display: block; width: 157px; max-width: 157px; border: 0"
          >
        </td>
        <td
          width="45"
          height="157"
          valign="middle"
          align="center"
          :style="{
            width: '45px',
            height: '157px',
            padding: '0',
            background: bgColor,
          }"
        >
          <a
            :href="normalizeUrl(`https://${website}`)"
            :style="{
              display: 'inline-block',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: '\'Montserrat\', Arial, Helvetica, sans-serif',
              fontSize: scaledPx(8),
              lineHeight: '1',
              fontWeight: '700',
              letterSpacing: '0',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }"
          >
            {{ website }}
          </a>
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr v-if="isAddonTool('videoConference')">
        <td
          colspan="3"
          style="padding: 10px 0 0 0"
        >
          <Addons.VideoConference />
        </td>
      </tr>
      <tr v-if="isAddonTool('mobileApp')">
        <td
          colspan="3"
          style="padding: 10px 0 0 0"
        >
          <Addons.MobileApp />
        </td>
      </tr>
      <tr v-if="isAddonTool('banner')">
        <td
          colspan="3"
          style="padding: 10px 0 0 0"
        >
          <Addons.Banner />
        </td>
      </tr>
      <tr v-if="isAddonTool('cta')">
        <td
          colspan="3"
          style="padding: 10px 0 0 0"
        >
          <Addons.Cta />
        </td>
      </tr>
      <tr v-if="isAddonTool('disclaimer')">
        <td
          colspan="3"
          style="padding: 8px 0 0 0"
        >
          <Addons.Disclaimer />
        </td>
      </tr>
    </tbody>
  </table>
</template>
