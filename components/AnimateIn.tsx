'use client'
import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

interface Props {
  children: ReactNode
  /** 'fade-up' (default) | 'fade-left' | 'fade-right' */
  direction?: 'fade-up' | 'fade-left' | 'fade-right'
  /** delay in ms before animating after entering viewport */
  delay?: number
  className?: string
  style?: CSSProperties
  as?: keyof JSX.IntrinsicElements
}

export default function AnimateIn({
  children,
  direction = 'fade-up',
  delay = 0,
  className,
  style,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('animated')
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        if (delay) {
          setTimeout(() => el.classList.add('animated'), delay)
        } else {
          el.classList.add('animated')
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const animAttr = direction === 'fade-up' ? 'fade-up' : direction

  const AnyTag = Tag as any // eslint-disable-line

  return (
    <AnyTag
      ref={ref}
      data-animate={animAttr}
      className={className}
      style={style}
    >
      {children}
    </AnyTag>
  )
}
