import { shallowMount, Wrapper } from '@vue/test-utils';
import SearchDropdown from '@/components/SearchDropdown.vue';
import Channel from '../utils/Channel';

describe('@/components/SearchDropdown.vue', () => {
  let wrapper: Wrapper<SearchDropdown>;
  const channel = new Channel(1, 'Alma')
  const mockStore = {
    state: { channel }
  }
  const mocks = { $store: mockStore }

  beforeEach(() => {
    wrapper = shallowMount(SearchDropdown, {
      mocks,
      propsData: {
        searchKey: 'name',
        choices: [
          new Channel(1, 'Alma'),
          new Channel(2, 'Polaris')
        ]
      }
    })
  })

  it('opens dropdown menu on button click', async () => {
    wrapper.find('.button').trigger('click')

    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('is-active')
  })
});
