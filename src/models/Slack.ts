import Block from './Block'
import Message from './Message'
import Standup from './Standup'
import { IUrls } from '../@types/types'

export default class Slack {
  private blocks: Block[];
  private standups: Standup[];
  private channel: string;
  private urls: IUrls[];
  constructor(
    standups: Standup[],
    channel: string,
    urls: IUrls[]
  ) {
    this.standups = standups
    this.channel = channel
    this.urls = urls
    this.blocks = []
  }

  public message() {
    this.createBlocks()
    return new Message(this.channel, this.blocks)
  }

  private createBlocks(): void {
    let title: Block;

    this.blocks.push(
      new Block('Standup Response'),
      new Block(null, 'divider')
    )

    this.standups.forEach((standup) => {
      let list: string = '';
      const section = standup.empty
        ? standup.empty.title
        : standup.section

      title = new Block(section)

      if (standup.todos.length === 0) {
        this.blocks.push(title, new Block('> None'))
        return
      }

      standup.todos.forEach((todo) => {
        list += this.linkify(todo.text) + '\n'
      })

      this.blocks.push(title, new Block(`>>> ${list.trim()}`))
    })
  }

  private linkify(text: string) {
    let newText: string = '';
    if (!this.urls) {
      return text
    }

    this.urls.forEach((url) => {
      newText = text.replace(
        this.captureLink(url.match),
        `<${url.prepend}$2|$2>`
      )
    })

    return newText
  }

  private captureLink(match: string) {
    return new RegExp(`([\[*])(${match})([\]*])`, 'g')
  }
}
