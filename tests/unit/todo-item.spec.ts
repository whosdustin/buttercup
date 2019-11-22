import { Wrapper, shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

// Utils
import Todo from '@/models/Todo'

describe('@components/TodoItem', () => {
  let wrapper: Wrapper<TodoItem>;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      propsData: {
        id: 'todo-section-0'
      }
    })
  })

  it('mounts with prop id', async () => {
    expect(wrapper.props('id')).toEqual('todo-section-0')
  })

  it('mounts with default data', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.props('value')).toEqual(new Todo())
  })

  // TODO: Do I test interaction with children?
  // it('emits todo when checkbox is checked', async () => {
  //   const checkbox = wrapper.find('input[type="checkbox"]')

  //   checkbox.setChecked()
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.emitted('input')[0]).toEqual([new Todo('', true)])
  // })

  it('emits todo when typed in textarea', async () => {
    const textarea = wrapper.find('textarea')
    textarea.setValue('Hello')

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')[0]).toEqual([new Todo('Hello')])
  })

  it('emits new-todo on keydown Enter', async () => {
    const textarea = wrapper.find('textarea')
    textarea.trigger('keydown.enter')

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('new-todo')).toBeTruthy()
  })

  it('is deletable on keydown Delete when new', async () => {
    const textarea = wrapper.find('textarea')
    textarea.trigger('keydown.delete')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.deletable).toBe(true)
  })

  it('is not deletable on keydown Delete when > 1 characters', async () => {
    const textarea = wrapper.find('textarea')
    textarea.setValue('H')
    textarea.trigger('keydown.delete')

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$data.deletable).toBe(false)
  })
});
