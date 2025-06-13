import { mount } from '@vue/test-utils'
import BaseTextArea from '@/components/base/BaseTextArea.vue'
import { describe, expect, it } from 'vitest'

describe('BaseTextArea', () => {
  it('renders with modelValue', () => {
    const wrapper = mount(BaseTextArea, { props: { modelValue: 'Hello' } })
    expect(wrapper.find('textarea').element.value).toBe('Hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseTextArea, { props: { modelValue: '' } })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Test')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Test'])
  })

  it('merges custom classes', () => {
    const wrapper = mount(BaseTextArea, { props: { class: 'bg-blue-100' } })
    expect(wrapper.find('textarea').classes()).toContain('bg-blue-100')
  })

  it('emits focus event', async () => {
    const wrapper = mount(BaseTextArea)
    await wrapper.find('textarea').trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('emits blur event', async () => {
    const wrapper = mount(BaseTextArea)
    await wrapper.find('textarea').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits keydown event', async () => {
    const wrapper = mount(BaseTextArea)
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('keydown')).toBeTruthy()
  })

  it('exposes focus method', () => {
    const wrapper = mount(BaseTextArea)
    expect(wrapper.vm.focus).toBeDefined()
    expect(typeof wrapper.vm.focus).toBe('function')
  })

  it('exposes blur method', () => {
    const wrapper = mount(BaseTextArea)
    expect(wrapper.vm.blur).toBeDefined()
    expect(typeof wrapper.vm.blur).toBe('function')
  })

  it('exposes select method', () => {
    const wrapper = mount(BaseTextArea)
    expect(wrapper.vm.select).toBeDefined()
    expect(typeof wrapper.vm.select).toBe('function')
  })

  it('maintains default classes when custom classes are provided', () => {
    const wrapper = mount(BaseTextArea, { props: { class: 'bg-blue-100' } })
    const textarea = wrapper.find('textarea')
    expect(textarea.classes()).toContain('p-1.5')
    expect(textarea.classes()).toContain('w-full')
    expect(textarea.classes()).toContain('dark:bg-zinc-800')
    expect(textarea.classes()).toContain('rounded-md')
    expect(textarea.classes()).toContain('resize-none')
    expect(textarea.classes()).toContain('outline-none')
    expect(textarea.classes()).toContain('text-body-sm')
  })
})
