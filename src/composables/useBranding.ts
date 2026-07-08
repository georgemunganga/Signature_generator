import { useStorage } from '@vueuse/core'

export function useBranding() {
  const logoUrl = useStorage('branding-logo-url', '')
  const logoLink = useStorage('branding-logo-link', 'https://www.mightyfinance.co.zm')

  return {
    logoLink,
    logoUrl,
  }
}
