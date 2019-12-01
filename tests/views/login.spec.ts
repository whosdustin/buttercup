import { mount, Wrapper } from '@vue/test-utils';
import Login from '@/views/Login.vue';

describe('@views/Login', () => {
  let wrapper: Wrapper<Login>;

  it('exports a valid component', () => {
    wrapper = mount(Login);
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
