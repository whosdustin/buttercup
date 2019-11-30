import Block from './Block'
import Message from './Message'
import Standup from './Standup'
import { IUrls } from '../@types/types'

export default class Chat {
  private blocks: Block[];
  private standups: Standup[];
  private channel: string;
  private urls: IUrls[];
  private token: string;
  constructor(
    token: string,
    standups: Standup[],
    channel: string,
    urls: IUrls[]
  ) {
    this.token = token
    this.standups = standups
    this.channel = channel
    this.urls = urls
    this.blocks = []
  }

  public message() {
    this.createBlocks()
    return new Message(this.token, this.channel, this.blocks)
  }

  private createBlocks(): void {
    let title: Block;
    // const response = {...new Block('Standup Response')}
    // const divider = {...new Block(null, 'divider')}
    // const none = {...new Block('> None')}
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
      // const items = {...new Block(`>>> ${list.trim()}`)}
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
