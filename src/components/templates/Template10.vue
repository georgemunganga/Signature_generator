<script setup lang="ts">
import { normalizeUrl } from '@/utils'

const { installed, options } = useSignatures()

const PURPLE = '#653398'

const fieldByLabel = computed(() => {
  return installed.value.tools.basic.reduce<Record<string, string>>((acc, field) => {
    acc[field.label.toLowerCase()] = field.value
    return acc
  }, {})
})

const name = computed(() => fieldByLabel.value['full name'] || fieldByLabel.value.name || '')
const title = computed(() => fieldByLabel.value['job title'] || fieldByLabel.value.title || '')
const phone = computed(() => fieldByLabel.value.phone || '')
const address = computed(() => {
  return fieldByLabel.value.address || fieldByLabel.value.company || ''
})
const addressLines = computed(() => address.value.split('\n'))
const website = computed(() => {
  const value = fieldByLabel.value.website || 'https://www.mightyfinance.co.zm'
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '')
})
</script>

<template>
  <table
    cellpadding="0"
    cellspacing="0"
    border="0"
    role="presentation"
    width="1161"
    style="
      width: 1161px;
      height: 331px;
      border-collapse: collapse;
      border-spacing: 0;
      background: #ffffff;
      margin: 0;
    "
  >
    <tbody>
      <tr>
        <td
          width="704"
          height="331"
          valign="top"
          style="width: 704px; height: 331px; padding: 34px 0 0 92px; box-sizing: border-box"
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
                    padding: 0 0 22px 0;
                    font-family: 'Poppins', Arial, Helvetica, sans-serif;
                    font-size: 42px;
                    line-height: 1;
                    font-weight: 400;
                    color: #653398;
                    letter-spacing: 0;
                  "
                >
                  {{ name }}
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 0 0 20px 0;
                    font-family: 'Poppins', Arial, Helvetica, sans-serif;
                    font-size: 31px;
                    line-height: 1;
                    font-weight: 500;
                    color: #f8b611;
                    letter-spacing: 0;
                  "
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
                            padding: 0 18px 8px 4px;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 31px;
                            line-height: 1;
                            font-weight: 700;
                            color: #653398;
                          "
                        >
                          P:
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 0 0 8px 0;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 31px;
                            line-height: 1;
                            font-weight: 400;
                            color: #242124;
                          "
                        >
                          <a
                            :href="`tel:${phone}`"
                            style="color: #242124; text-decoration: none"
                          >{{
                            phone
                          }}</a>
                        </td>
                      </tr>
                      <tr>
                        <td
                          valign="top"
                          style="
                            padding: 0 18px 0 4px;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 31px;
                            line-height: 1;
                            font-weight: 700;
                            color: #653398;
                          "
                        >
                          A:
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 0;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 31px;
                            line-height: 1.35;
                            font-weight: 400;
                            color: #242124;
                          "
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
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
        <td
          width="360"
          height="331"
          valign="middle"
          align="center"
          style="width: 360px; height: 331px; padding: 0"
        >
          <img
            src="https://signature-generator-tau.vercel.app/assets/mighty-fin-logo.png"
            alt="mighty fin"
            width="333"
            style="display: block; width: 333px; max-width: 333px; border: 0"
          >
        </td>
        <td
          width="97"
          height="331"
          valign="middle"
          align="center"
          :style="{
            width: '97px',
            height: '331px',
            padding: '0',
            background: PURPLE,
          }"
        >
          <a
            :href="normalizeUrl(`https://${website}`)"
            :style="{
              display: 'inline-block',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: options.fontFamily,
              fontSize: '18px',
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
  </table>
</template>
