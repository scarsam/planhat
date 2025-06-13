import { mount } from '@vue/test-utils'
import BaseAvatar from '@/components/base/BaseAvatar.vue'
import { describe, expect, it } from 'vitest'

describe('BaseAvatar', () => {
  it('renders image when src is provided', () => {
    const wrapper = mount(BaseAvatar, {
      props: { src: 'test.png', alt: 'Test' },
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('test.png')
    expect(wrapper.find('img').attributes('alt')).toBe('Test')
  })

  it('renders fallback when image fails', async () => {
    const wrapper = mount(BaseAvatar, {
      props: { src: 'bad.png', fallback: 'AB' },
    })
    // Simulate image error
    await wrapper.find('img').trigger('error')
    expect(wrapper.text()).toContain('AB')
  })

  it('renders slot fallback', () => {
    const wrapper = mount(BaseAvatar, {
      slots: { default: 'XY' },
    })
    expect(wrapper.text()).toContain('XY')
  })

  it('applies custom classes', () => {
    const wrapper = mount(BaseAvatar, {
      props: { class: 'w-12 h-12' },
    })
    expect(wrapper.classes()).toContain('w-12')
    expect(wrapper.classes()).toContain('h-12')
  })

  it('maintains default classes when custom classes are provided', () => {
    const wrapper = mount(BaseAvatar, {
      props: { class: 'w-12 h-12' },
    })
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('justify-center')
    expect(wrapper.classes()).toContain('rounded-full')
  })
})
