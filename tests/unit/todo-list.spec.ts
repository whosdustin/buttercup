import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import TodoItem from '@/components/TodoItem.vue';

// Utils
import Todo from '../utils/TodoItem'

describe('@components/TodoList', () => {
  let wrapper: Wrapper<TodoList>;

  it('exports a valid component', () => {
    wrapper = mount(TodoList);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('displays only empty state when no todos', async () => {
    wrapper = shallowMount(TodoList)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('empty-state-stub').exists()).toBe(true)
    expect(wrapper.find('todo-item-stub').exists()).toBe(false)
  })

  it('displays a todo item when data is sent', async () => {
    wrapper = shallowMount(TodoList, {
      propsData: {
        todos: [
          new Todo(false, 'Hello')
        ]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('todo-item-stub').exists()).toBe(true)
    expect(wrapper.find('empty-state-stub').exists()).toBe(false)
  })

  it('prints data in todo-item when data sent', async () => {
    wrapper = shallowMount(TodoList, {
      propsData: {
        todos: [ new Todo(false, 'Hello') ]
      },
      stubs: { 'todo-item': TodoItem }
    })

    const todo = wrapper.find(TodoItem)
    expect(todo.props('value')).toStrictEqual(new Todo(false, 'Hello'))
  })
});
