import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import EmptyState from '@/components/EmptyState.vue';

describe('@components/EmptyState', () => {
  let wrapper: Wrapper<EmptyState>;

  it('exports a valid component', () => {
    wrapper = mount(EmptyState);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('displays only title when title prop', async () => {
    wrapper = shallowMount(EmptyState, {
      propsData: {
        title: 'Hello'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.title').text()).toContain('Hello')
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('displays title and content when title and content props', async () => {
    wrapper = shallowMount(EmptyState, {
      propsData: {
        title: 'Hello',
        content: 'World'
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.title').text()).toContain('Hello')
    expect(wrapper.find('p').text()).toContain('World')
  })

  it('displays fake text divs when no props', async () => {
    wrapper = shallowMount(EmptyState)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.empty-title').exists()).toBe(true)
    expect(wrapper.find('.empty-text').exists()).toBe(true)
  })
});
