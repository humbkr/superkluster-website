import strings from './strings'

const locale = 'fr'

export function t(key: string) {
  let trad = ''

  try {
    trad = key.split('.').reduce((o, i) => o[i], strings[locale])
    if (!trad) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`)
      return ''
    }
  } catch (e) {
    console.warn(`Translation '${key}' for locale '${locale}' not found.`)
  }

  return trad
}

export default function useTranslation() {
  return {
    t,
  }
}
