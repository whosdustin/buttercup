import { mount, Wrapper } from '@vue/test-utils';
import BaseButton from '@/components/BaseButton.vue';

describe('@components/BaseButton', () => {
  let wrapper: Wrapper<BaseButton>;

  it('exports a valid component', () => {
    wrapper = mount(BaseButton);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
