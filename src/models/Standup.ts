// Types
import Todo from './Todo'
import { StandupSection, IEmptyState } from '../@types/types'

export default class Standup {
  public section: StandupSection;
  public name: string;
  public todos: Todo[];
  public icon: string;
  public empty?: IEmptyState;
  constructor(
    section: StandupSection,
    name: string,
    icon: string,
    empty?: IEmptyState,
    todos: Todo[] = [],
  ) {
    this.section = section
    this.name = name
    this.icon = icon
    this.empty = empty
    this.todos = todos
  }
}
