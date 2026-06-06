'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const elements = document.querySelectorAll<HTMLElement>('[data-animate]')
    if (!elements.length) return

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('animated'))
      return
    }

    const delays = new WeakMap<HTMLElement, number>()
    elements.forEach(el => {
      delays.set(el, parseInt(el.dataset.delay || '0', 10))
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = delays.get(el) ?? 0
          observer.unobserve(el)
          if (delay) {
            setTimeout(() => el.classList.add('animated'), delay)
          } else {
            el.classList.add('animated')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname]) // re-run on route change

  return null
}
