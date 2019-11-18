import { mount, Wrapper } from '@vue/test-utils';
import BaseCheckbox from '@/components/BaseCheckbox.vue';

describe('@components/BaseCheckbox', () => {
  let wrapper: Wrapper<BaseCheckbox>;

  it('exports a valid component', () => {
    wrapper = mount(BaseCheckbox);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
