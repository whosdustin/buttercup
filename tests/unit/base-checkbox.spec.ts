import { mount, Wrapper } from '@vue/test-utils';
import BaseCheckbox from '@/components/BaseCheckbox.vue';

describe('@components/BaseCheckbox', () => {
  let wrapper: Wrapper<BaseCheckbox>;

  it('exports a valid component', () => {
    wrapper = mount(BaseCheckbox, {
      propsData: {
        value: false,
        id: 'todo-section-0'
      }
    });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
