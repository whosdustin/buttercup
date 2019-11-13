export default class Channel {
  public id: string | number;
  public name: string;
  constructor(
    id: string | number,
    name: string
  ) {
    this.id = id;
    this.name = name;
  }
}
