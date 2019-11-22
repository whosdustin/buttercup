import { mount, Wrapper, shallowMount } from '@vue/test-utils';
import TabItem from '@/components/TabItem.vue';

describe('@components/TabItem', () => {
  let wrapper: Wrapper<TabItem>;

  it('exports a valid component', () => {
    wrapper = mount(TabItem);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('does not show by default', async () => {
    wrapper = mount(TabItem)

    await wrapper.vm.$nextTick()
    expect(wrapper.isEmpty()).toBe(true)
  })

  it('shows when selected', async () => {
    wrapper = shallowMount(TabItem, {
      propsData: {
        selected: true
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.isVisible()).toBe(true)
  })

  it('shows empty state if no slots', async () => {
    wrapper = shallowMount(TabItem, {
      propsData: { selected: true }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('empty-state-stub').exists()).toBe(true)
  })

  it('does not show empty state when slot filled', async () => {
    wrapper = shallowMount(TabItem, {
      propsData: { selected: true },
      slots: { default: '<div />' }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('empty-state-stub').exists()).toBe(false)
  })
});
