<script setup lang="ts">
import { normalizeUrl } from '@/utils'

const { installed } = useSignatures()

const PURPLE = '#663092'

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
    width="660"
    style="
      width: 660px;
      height: 188px;
      border-collapse: collapse;
      border-spacing: 0;
      background: #ffffff;
      margin: 0;
    "
  >
    <tbody>
      <tr>
        <td
          width="416"
          height="188"
          valign="top"
          style="width: 416px; height: 188px; padding: 24px 0 0 52px; box-sizing: border-box"
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
                    padding: 0 0 16px 0;
                    font-family: 'Poppins', Arial, Helvetica, sans-serif;
                    font-size: 24px;
                    line-height: 1;
                    font-weight: 400;
                    color: #663092;
                    letter-spacing: 0;
                  "
                >
                  {{ name }}
                </td>
              </tr>
              <tr>
                <td
                  style="
                    padding: 0 0 13px 0;
                    font-family: 'Poppins', Arial, Helvetica, sans-serif;
                    font-size: 18px;
                    line-height: 1;
                    font-weight: 500;
                    color: #ffc00e;
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
                            padding: 0 10px 8px 2px;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 18px;
                            line-height: 1;
                            font-weight: 700;
                            color: #663092;
                          "
                        >
                          P:
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 0 0 8px 0;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 18px;
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
                            padding: 0 10px 0 2px;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 18px;
                            line-height: 1;
                            font-weight: 700;
                            color: #663092;
                          "
                        >
                          A:
                        </td>
                        <td
                          valign="top"
                          style="
                            padding: 0;
                            font-family: 'Poppins', Arial, Helvetica, sans-serif;
                            font-size: 18px;
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
          width="190"
          height="188"
          valign="middle"
          align="center"
          style="width: 190px; height: 188px; padding: 0"
        >
          <img
            src="https://signature-generator-tau.vercel.app/assets/mighty-fin-logo.png"
            alt="mighty fin"
            width="189"
            style="display: block; width: 189px; max-width: 189px; border: 0"
          >
        </td>
        <td
          width="54"
          height="188"
          valign="middle"
          align="center"
          :style="{
            width: '54px',
            height: '188px',
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
              fontFamily: '\'Poppins\', Arial, Helvetica, sans-serif',
              fontSize: '9.5px',
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
