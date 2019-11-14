import { shallowMount, Wrapper } from '@vue/test-utils';
import SearchResult from '@/components/SearchResult.vue';
import Channel from '../utils/Channel';

describe('@/components/SearchResults.vue', () => {
  let wrapper: Wrapper<SearchResult>;
  const channel = new Channel('1', 'choice')
  const mockStore = {
    state: { channel },
    commit: jest.fn()
  }
  const mocks = { $store: mockStore }

  it('is active when it matches default choice', async () => {
    wrapper = shallowMount(SearchResult, {
      mocks,
      propsData: {
        result: channel,
        text: 'name',
        value: 'id'
      }
    });

    wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('is-active')
  });

  it('is inactive when it doesn\'t match choice', async () => {
    wrapper = shallowMount(SearchResult, {
      mocks,
      propsData: {
        result: new Channel('2', 'not choice'),
        text: 'name',
        value: 'id'
      }
    });

    await wrapper.vm.$nextTick()
    expect(wrapper.classes('is-active')).toBe(false)
  })

  it('triggers store to change selection', async () => {
    wrapper = shallowMount(SearchResult, {
      mocks,
      propsData: {
        result: channel,
        text: 'name',
        value: 'id'
      }
    });

    wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(mockStore.commit).toHaveBeenCalledWith(
      'SET_CHANNEL', channel
    )
  })
});
