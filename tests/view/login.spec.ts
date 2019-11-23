import { mount, Wrapper } from '@vue/test-utils';
import Login from '@/components/Login.vue';

describe('@components/Login', () => {
  let wrapper: Wrapper<Login>;

  it('exports a valid component', () => {
    wrapper = mount(Login);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
