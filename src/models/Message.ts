import { KnownBlock, Block, ChatPostMessageArguments } from '@slack/web-api';

export default class Message implements ChatPostMessageArguments {
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
    blocks: Array<KnownBlock | Block>,
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
