import { IBlockContent, BlockType } from '../@types/types'

export default class Block {
  private type: BlockType;
  private text?: IBlockContent;
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
