import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

export default {
  pretty(date: Date | number) {
    return dayjs(date).format('dddd, MMMM Do')
  },
  numeric(date: Date) {
    return dayjs(date).valueOf()
  }
}
