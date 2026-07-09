const { sonner } = useSonner()

const PUBLIC_ORIGIN = 'https://esignatures.mightyfinance.co.zm'

const html = ref('')
const isHtmlLarge = computed(() => html.value.length > 10000)

const CONTENT_ATTRS = new Set([
  'align',
  'alt',
  'aria-label',
  'bgcolor',
  'border',
  'cellpadding',
  'cellspacing',
  'colspan',
  'height',
  'href',
  'role',
  'rowspan',
  'src',
  'style',
  'target',
  'title',
  'valign',
  'width',
])

const INLINE_SAFE_ELEMENTS = new Set([
  'A',
  'BR',
  'IMG',
  'P',
  'SPAN',
  'STRONG',
  'TABLE',
  'TBODY',
  'TD',
  'TFOOT',
  'TH',
  'THEAD',
  'TR',
])

const EMAIL_ONLY_STYLE_PROPS = new Set([
  'msInterpolationMode',
  'msoLineHeightRule',
  'msoTableLspace',
  'msoTableRspace',
])

function cssPropertyName(property: string) {
  if (/^ms[A-Z]/.test(property))
    return `-${property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}`

  return property.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
}

function appendEmailStyle(el: HTMLElement, property: string, value: string) {
  const style = el.getAttribute('style') || ''

  if (new RegExp(`(?:^|;)\\s*${property}\\s*:`, 'i').test(style))
    return

  el.setAttribute('style', `${style.trim().replace(/;?$/, ';')} ${property}: ${value};`.trim())
}

function addStyle(el: HTMLElement, styles: Record<string, string>) {
  for (const [property, value] of Object.entries(styles)) {
    if (!value)
      continue

    const cssName = cssPropertyName(property)

    if (EMAIL_ONLY_STYLE_PROPS.has(property)) {
      appendEmailStyle(el, cssName, value)
      continue
    }

    el.style.setProperty(cssName, value)
  }
}

function absoluteUrl(value: string) {
  const trimmed = value.trim()

  if (!trimmed || /^(?:mailto:|tel:|skype:|tg:|whatsapp:|sms:|data:|#)/i.test(trimmed))
    return trimmed

  try {
    const url = new URL(trimmed, PUBLIC_ORIGIN)

    if (['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname))
      return new URL(`${url.pathname}${url.search}${url.hash}`, PUBLIC_ORIGIN).href

    return url.href
  }
  catch {
    return trimmed
  }
}

function removeUnsafeAttributes(el: Element) {
  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase()

    if (
      name === 'class'
      || name === 'data-slot'
      || name.startsWith('data-v-')
      || name.startsWith('on')
    ) {
      el.removeAttribute(attr.name)
      continue
    }

    if (!CONTENT_ATTRS.has(name) && !name.startsWith('aria-'))
      el.removeAttribute(attr.name)
  }
}

function normalizeTable(table: HTMLTableElement) {
  table.setAttribute('cellpadding', table.getAttribute('cellpadding') || '0')
  table.setAttribute('cellspacing', table.getAttribute('cellspacing') || '0')
  table.setAttribute('border', table.getAttribute('border') || '0')
  table.setAttribute('role', table.getAttribute('role') || 'presentation')
  addStyle(table, {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    margin: table.style.margin || '0',
    msoTableLspace: '0pt',
    msoTableRspace: '0pt',
  })
}

function normalizeImage(img: HTMLImageElement) {
  const width = img.getAttribute('width')
  const height = img.getAttribute('height')

  img.setAttribute('border', '0')

  if (img.getAttribute('src'))
    img.setAttribute('src', absoluteUrl(img.getAttribute('src') || ''))

  if (width && /^\d+$/.test(width)) {
    img.style.width = `${width}px`
    img.style.maxWidth = `${width}px`
  }

  if (height && /^\d+$/.test(height))
    img.style.height = `${height}px`

  addStyle(img, {
    display: img.style.display || 'block',
    border: '0',
    outline: 'none',
    textDecoration: 'none',
    msInterpolationMode: 'bicubic',
  })
}

function normalizeAnchor(anchor: HTMLAnchorElement) {
  if (anchor.getAttribute('href'))
    anchor.setAttribute('href', absoluteUrl(anchor.getAttribute('href') || ''))

  addStyle(anchor, {
    color: anchor.style.color || 'inherit',
    textDecoration: anchor.style.textDecoration || 'none',
  })
}

function normalizeTextElement(el: HTMLElement) {
  if (el.style.fontFamily && !/arial/i.test(el.style.fontFamily))
    el.style.fontFamily = `${el.style.fontFamily}, Arial, Helvetica, sans-serif`

  if (el.tagName === 'P') {
    addStyle(el, {
      margin: el.style.margin || '0',
      msoLineHeightRule: 'exactly',
    })
  }

  if (el.tagName === 'TD' || el.tagName === 'TH') {
    addStyle(el, {
      msoLineHeightRule: 'exactly',
    })
  }
}

function normalizeElement(el: HTMLElement) {
  removeUnsafeAttributes(el)

  if (!INLINE_SAFE_ELEMENTS.has(el.tagName) && el.children.length === 0)
    return

  if (el instanceof HTMLTableElement)
    normalizeTable(el)

  if (el instanceof HTMLImageElement)
    normalizeImage(el)

  if (el instanceof HTMLAnchorElement)
    normalizeAnchor(el)

  normalizeTextElement(el)
}

function serializeEmailHtml() {
  const slot = document.querySelector('[data-slot="signature"]')
  if (!slot)
    return ''

  const root = slot.querySelector('table') || slot
  const clone = root.cloneNode(true) as HTMLElement

  normalizeElement(clone)
  clone.querySelectorAll<HTMLElement>('*').forEach(normalizeElement)

  return clone.outerHTML.replace(/<!--v-if-->/g, '')
}

async function checkClipboardPermission() {
  try {
    const permission = await navigator.permissions.query({
      name: 'clipboard-write' as PermissionName,
    })
    return permission.state !== 'denied'
  }
  catch {
    // для Safari и Firefox т.к. не поддерживают clipboard-write
    return true
  }
}

function getHtml() {
  html.value = serializeEmailHtml()
}

async function onCopySelect() {
  const el = document.querySelector('[data-slot="signature"]')
  if (!el)
    return

  const safeHtml = serializeEmailHtml()
  const plainText = el.textContent || ''

  try {
    const permission = await checkClipboardPermission()

    if (!permission) {
      sonner({
        title: 'Oops! Something went wrong.',
        type: 'error',
        description: 'You need to allow clipboard access to copy the signature.',
      })
      return
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([safeHtml], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
      }),
    ])

    sonner({
      title: 'Success',
      type: 'success',
      description: 'Signature copied to clipboard.',
    })
  }
  catch (err) {
    if (err instanceof Error && err.name === 'NotAllowedError') {
      sonner({
        title: 'Oops! Something went wrong.',
        type: 'error',
        description: 'You need to allow clipboard access to copy the signature.',
      })
    }
  }
}

async function onCopyHTML() {
  const el = document.querySelector('[data-slot="signature"]')
  if (!el)
    return

  try {
    const permission = await checkClipboardPermission()

    if (!permission) {
      sonner({
        title: 'Oops! Something went wrong.',
        type: 'error',
        description: 'You need to allow clipboard access to copy the signature.',
      })
      return
    }

    getHtml()
    await navigator.clipboard.writeText(html.value)

    sonner({
      title: 'Success',
      type: 'success',
      description: 'Signature copied to clipboard.',
    })
  }
  catch (err) {
    console.error(err)
  }
}

export function useCopySignature() {
  return {
    isHtmlLarge,
    onCopySelect,
    onCopyHTML,
    getHtml,
  }
}
