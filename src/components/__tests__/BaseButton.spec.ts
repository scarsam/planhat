import { mount } from '@vue/test-utils'
import BaseButton from '@/components/base/BaseButton.vue'
import { describe, expect, it } from 'vitest'

describe('BaseButton', () => {
  it('renders with default props', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').attributes('type')).toBe('button')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('renders with custom type', () => {
    const wrapper = mount(BaseButton, { props: { type: 'submit' } })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('renders with disabled state', () => {
    const wrapper = mount(BaseButton, { props: { disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').classes()).toContain('disabled:opacity-60')
  })

  it('applies variant classes', () => {
    const variants = ['default', 'outline', 'secondary', 'destructive', 'ghost'] as const
    variants.forEach((variant) => {
      const wrapper = mount(BaseButton, { props: { variant } })
      const button = wrapper.find('button')

      switch (variant) {
        case 'default':
          expect(button.classes()).toContain('bg-white')
          expect(button.classes()).toContain('dark:bg-zinc-800')
          break
        case 'outline':
          expect(button.classes()).toContain('border')
          expect(button.classes()).toContain('border-zinc-200')
          break
        case 'secondary':
          expect(button.classes()).toContain('bg-zinc-100')
          expect(button.classes()).toContain('dark:bg-zinc-700')
          break
        case 'destructive':
          expect(button.classes()).toContain('bg-red-500')
          expect(button.classes()).toContain('text-white')
          break
        case 'ghost':
          expect(button.classes()).toContain('bg-transparent')
          break
      }
    })
  })

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'default', 'lg'] as const
    sizes.forEach((size) => {
      const wrapper = mount(BaseButton, { props: { size } })
      const button = wrapper.find('button')

      switch (size) {
        case 'xs':
          expect(button.classes()).toContain('h-6')
          expect(button.classes()).toContain('text-xs')
          break
        case 'sm':
          expect(button.classes()).toContain('h-8')
          expect(button.classes()).toContain('text-xs')
          break
        case 'default':
          expect(button.classes()).toContain('h-9')
          expect(button.classes()).toContain('text-sm')
          break
        case 'lg':
          expect(button.classes()).toContain('h-11')
          expect(button.classes()).toContain('text-base')
          break
      }
    })
  })

  it('merges custom classes', () => {
    const wrapper = mount(BaseButton, { props: { class: 'bg-blue-100' } })
    expect(wrapper.find('button').classes()).toContain('bg-blue-100')
  })

  it('maintains base classes when custom classes are provided', () => {
    const wrapper = mount(BaseButton, { props: { class: 'bg-blue-100' } })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('inline-flex')
    expect(button.classes()).toContain('items-center')
    expect(button.classes()).toContain('justify-center')
    expect(button.classes()).toContain('rounded-md')
    expect(button.classes()).toContain('font-medium')
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('forwards additional attributes', () => {
    const wrapper = mount(BaseButton, {
      attrs: {
        'data-testid': 'test-button',
        'aria-label': 'Test button',
      },
    })
    expect(wrapper.find('button').attributes('data-testid')).toBe('test-button')
    expect(wrapper.find('button').attributes('aria-label')).toBe('Test button')
  })
})
