import Block from './Block'

export default class Message {
  private channel: string;
  private blocks: Block[];
  /* tslint:disable-next-line */
  private as_user: boolean;
  constructor(
    channel: string,
    blocks: Block[],
    /* tslint:disable-next-line */
    as_user: boolean = true
  ) {
    this.channel = channel
    this.as_user = as_user
    this.blocks = blocks
  }
}
