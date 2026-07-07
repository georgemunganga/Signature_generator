export function useGtag() {
  return {
    gtag: (...args: unknown[]) => {
      const gtag
        = globalThis.window && 'gtag' in globalThis.window ? globalThis.window.gtag : undefined

      if (typeof gtag === 'function') {
        gtag(...args)
      }
    },
  }
}
