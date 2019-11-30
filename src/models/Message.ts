import Block from './Block'

export default class Message {
  [key: string]: any
  public channel: string;
  public text: string;
  public blocks: any;
  // tslint:disable-next-line
  public as_user: boolean;
  public token: string;
  constructor(
    token: string,
    channel: string,
    blocks: Block[],
    // tslint:disable-next-line
    as_user: boolean = true
  ) {
    this.token = token
    this.text = ''
    this.channel = channel
    this.as_user = as_user
    this.blocks = JSON.stringify(blocks)
  }
}
