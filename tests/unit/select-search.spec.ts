import { shallowMount, Wrapper } from '@vue/test-utils'
import SelectSearch from '@/components/SelectSearch.vue'

import Channel from '../utils/Channel'

describe('@/components/SelectSearch.vue', () => {
  let wrapper: Wrapper<SelectSearch>;

  beforeEach(() => {
    wrapper = shallowMount(SelectSearch, {
      propsData: {
        choices: [
          new Channel(1, 'Alma'),
          new Channel(2, 'Polaris')
        ],
        searchKey: 'name'
      }
    })
  })

  it('displays filtered search result panels', async () => {
    wrapper.setData({
      search: 'Alma'
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('search-result-stub').isVisible()).toBe(true)
  })

  it('returns no results when text has no matches', async () => {
    wrapper.setData({
      search: 'Tiger'
    })
    await wrapper.vm.$nextTick()
    const item = wrapper.find('.empty-results')

    expect(item.isVisible()).toBe(true)
    expect(item.text()).toBe('No Results Match')
  })
})
