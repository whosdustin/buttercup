import { mount, Wrapper } from '@vue/test-utils';
import TabList from '@/components/TabList.vue';

describe('@components/TabList', () => {
  let wrapper: Wrapper<TabList>;

  it('exports a valid component', () => {
    wrapper = mount(TabList);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
