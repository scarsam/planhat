import { mount } from '@vue/test-utils'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

describe('BaseBadge', () => {
  it('renders with default props', () => {
    const wrapper = mount(BaseBadge)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('div').classes()).toContain('inline-flex')
    expect(wrapper.find('div').classes()).toContain('items-center')
    expect(wrapper.find('div').classes()).toContain('gap-1')
    expect(wrapper.find('div').classes()).toContain('rounded-full')
  })

  it('applies variant classes', () => {
    const variants = ['default', 'outline', 'secondary', 'destructive'] as const
    variants.forEach((variant) => {
      const wrapper = mount(BaseBadge, { props: { variant } })
      const badge = wrapper.find('div')

      switch (variant) {
        case 'default':
          expect(badge.classes()).toContain('bg-zinc-100')
          expect(badge.classes()).toContain('dark:bg-zinc-800')
          break
        case 'outline':
          expect(badge.classes()).toContain('border')
          expect(badge.classes()).toContain('border-zinc-200')
          expect(badge.classes()).toContain('bg-transparent')
          break
        case 'secondary':
          expect(badge.classes()).toContain('bg-zinc-100')
          expect(badge.classes()).toContain('dark:bg-zinc-700')
          break
        case 'destructive':
          expect(badge.classes()).toContain('bg-red-500')
          expect(badge.classes()).toContain('text-white')
          break
      }
    })
  })

  it('merges custom classes', () => {
    const wrapper = mount(BaseBadge, { props: { class: 'bg-blue-100' } })
    expect(wrapper.find('div').classes()).toContain('bg-blue-100')
  })

  it('maintains base classes when custom classes are provided', () => {
    const wrapper = mount(BaseBadge, { props: { class: 'bg-blue-100' } })
    const badge = wrapper.find('div')
    expect(badge.classes()).toContain('inline-flex')
    expect(badge.classes()).toContain('items-center')
    expect(badge.classes()).toContain('gap-1')
    expect(badge.classes()).toContain('rounded-full')
    expect(badge.classes()).toContain('font-medium')
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseBadge, {
      slots: { default: 'New' },
    })
    expect(wrapper.text()).toBe('New')
  })

  it('renders as child element when asChild is true', () => {
    const wrapper = mount(BaseBadge, {
      props: { asChild: true },
      slots: {
        default: () => h('a', { href: '/test' }, 'Link'),
      },
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('/test')
    expect(wrapper.find('a').text()).toBe('Link')
  })

  it('forwards additional attributes', () => {
    const wrapper = mount(BaseBadge, {
      attrs: {
        'data-testid': 'test-badge',
        'aria-label': 'Test badge',
      },
    })
    expect(wrapper.find('div').attributes('data-testid')).toBe('test-badge')
    expect(wrapper.find('div').attributes('aria-label')).toBe('Test badge')
  })

  it('applies dark mode classes', () => {
    const wrapper = mount(BaseBadge, { props: { variant: 'default' } })
    const badge = wrapper.find('div')
    expect(badge.classes()).toContain('dark:bg-zinc-800')
    expect(badge.classes()).toContain('dark:text-white')
  })
})
