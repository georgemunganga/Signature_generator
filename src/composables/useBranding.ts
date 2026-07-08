import { useStorage } from '@vueuse/core'

export function useBranding() {
  const companyName = useStorage('branding-company-name', 'Mighty Finance')
  const logoUrl = useStorage('branding-logo-url', '')
  const logoLink = useStorage('branding-logo-link', 'https://www.mightyfinance.co.zm')

  return {
    companyName,
    logoLink,
    logoUrl,
  }
}
