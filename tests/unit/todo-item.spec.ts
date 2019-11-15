import { Wrapper, shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

// Utils
import Todo from '../utils/TodoItem'

describe('@components/TodoItem', () => {
  let wrapper: Wrapper<TodoItem>;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem)
  })

  it('mounts with default data', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.props('value')).toEqual(new Todo(false, ''))
  })

  it('emits todo when checkbox is checked', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]')

    checkbox.setChecked()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')[0]).toEqual([new Todo(true, '')])
  })

  it('emits todo when typed in textarea', async () => {
    const textarea = wrapper.find('textarea')
    textarea.setValue('Hello')

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')[0]).toEqual([new Todo(false, 'Hello')])
  })
});
