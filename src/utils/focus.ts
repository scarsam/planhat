export function getTabbableElements() {
  const all = Array.from(document.querySelectorAll<HTMLElement>('[tabindex]'))

  return all
    .filter((el) => {
      const t = Number(el.getAttribute('tabindex'))
      return !isNaN(t) && t > 0
    })
    .sort((a, b) => {
      return Number(a.getAttribute('tabindex')) - Number(b.getAttribute('tabindex'))
    })
}

export function focusElementByTabindex(tabindex: number) {
  const elems = getTabbableElements()
  const el = elems.find((el) => Number(el.getAttribute('tabindex')) === tabindex)
  el?.focus()
}
