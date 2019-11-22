import { KnownBlock, Block } from '@slack/web-api';

export default class Message {
  public channel: string;
  public text: string;
  public blocks: Array<KnownBlock | Block>;
  /* tslint:disable-next-line */
  public as_user: boolean;
  constructor(
    channel: string,
    blocks: Array<KnownBlock | Block>,
    /* tslint:disable-next-line */
    as_user: boolean = true
  ) {
    this.text = ''
    this.channel = channel
    this.as_user = as_user
    this.blocks = blocks
  }
}
