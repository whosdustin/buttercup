import { shallowMount, Wrapper } from '@vue/test-utils';
import Notifications from '@/components/Notifications.vue';

// Utils
import Notify from '@/utils/Notify'

describe('@/components/Notifications.vue', () => {
  let wrapper: Wrapper<Notifications>;
  const mockStore = {
    state: {
      notifications: [
        new Notify('Alert')
      ]
    },
    commit: jest.fn()
  }

  beforeEach(() => {
    const mocks = { $store: mockStore }
    wrapper = shallowMount(Notifications, { mocks });
  })

  it('displays a notification message', async () => {
    await expect(wrapper.find('.notification > p').text()).toBe('Alert');
  });

  it('removes a notification message', async () => {
    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()
    expect(mockStore.commit).toHaveBeenCalledWith(
      'REMOVE_NOTIFICATION', 'Alert'
    )
  })
});
