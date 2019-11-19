export default class Todo {
  public done: boolean;
  public text: string;
  constructor(
    text: string = '',
    done: boolean = false,
  ) {
    this.done = done;
    this.text = text;
  }
}
