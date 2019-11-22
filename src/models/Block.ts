import { IBlockContent, BlockType } from '../@types/types'

export default class Block {
  public type: BlockType;
  public text?: IBlockContent;
  constructor(
    text: string | null,
    type: BlockType = 'section',
  ) {
    this.type = type
    if (type === 'section') {
     this.text = { type: 'mrkdwn', text }
    }
  }
}
