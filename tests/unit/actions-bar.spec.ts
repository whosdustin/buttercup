import { mount, Wrapper } from '@vue/test-utils';
import ActionsBar from '@/components/ActionsBar.vue';

describe('@components/ActionsBar', () => {
  let wrapper: Wrapper<ActionsBar>;

  it('exports a valid component', () => {
    wrapper = mount(ActionsBar);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
