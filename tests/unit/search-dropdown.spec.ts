import { mount, Wrapper } from '@vue/test-utils';
import SearchDropdown from '@/components/SearchDropdown.vue';

describe('@components/SearchDropdown', () => {
  let wrapper: Wrapper<SearchDropdown>;

  it('exports a valid component', () => {
    wrapper = mount(SearchDropdown);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
