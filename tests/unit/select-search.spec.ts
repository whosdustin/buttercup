import { shallowMount, Wrapper } from '@vue/test-utils'
import SelectSearch from '@/components/SelectSearch.vue'
import SearchResult from '@/components/SearchResult.vue';

describe('@/components/SelectSearch.vue', () => {
  let wrapper: Wrapper<SelectSearch>;

  beforeEach(() => {
    wrapper = shallowMount(SelectSearch, {
      propsData: {
        choices: [
          { id: '1', name: 'Alma' },
          { id: '2', name: 'Polaris' }
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
