import { Vue, Component } from 'vue-property-decorator'

function getTitle(vm: any) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}
@Component
export default class DocumentTitle extends Vue {
  public created() {
    const title = getTitle(this)
    if (title) {
      document.title = `${title} | Buttercup`
    }
  }
}
