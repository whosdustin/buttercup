import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import TodoItem from '@/components/TodoItem.vue';

// Utils
import Todo from '@/models/Todo'

describe('@components/TodoList', () => {
  let wrapper: Wrapper<TodoList>;

  it('exports a valid component', () => {
    wrapper = mount(TodoList, {
      propsData: {
        section: 'present'
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('displays only empty state when no todos', async () => {
    wrapper = shallowMount(TodoList, {
      propsData: {
        section: 'present'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('empty-state-stub').exists()).toBe(true)
    expect(wrapper.find('todo-item-stub').exists()).toBe(false)
  })

  it('displays a todo item when data is sent', async () => {
    wrapper = shallowMount(TodoList, {
      propsData: {
        section: 'present',
        todos: [ new Todo('Hello') ]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('todo-item-stub').exists()).toBe(true)
    expect(wrapper.find('empty-state-stub').exists()).toBe(false)
  })

  it('prints data in todo-item when data sent', async () => {
    wrapper = shallowMount(TodoList, {
      propsData: {
        section: 'present',
        todos: [ new Todo('Hello') ]
      },
      stubs: { 'todo-item': TodoItem }
    })

    const todo = wrapper.find(TodoItem)
    expect(todo.props('value')).toStrictEqual(new Todo('Hello'))
  })
});
