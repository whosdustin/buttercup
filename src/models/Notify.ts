import { ColorState } from '../@types/types'

export default class Notify {
  public message: string;
  public state: ColorState;
  constructor(
    message: string = '',
    state: ColorState = 'danger'
  ) {
    this.message = message
    this.state = state
  }
}
