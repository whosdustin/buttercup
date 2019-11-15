export default class TodoItem {
  public done: boolean;
  public text: string;
  constructor(
    done: boolean,
    text: string
  ) {
    this.done = done;
    this.text = text;
  }
}
