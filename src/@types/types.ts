import Vue from 'vue'
import Standup from '@/models/Standup';
import Todo from '@/models/Todo';

export interface RootState {
  notifications?: INotification[];
  channels?: IChannel[];
  channel: IChannel | null;
  standups: Standup[];
  urls: IUrls[];
}

export interface INotification {
  message: string;
  state: ColorState
}

export type ColorState = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';

export interface IChannel {
  id: string,
  name: string,
  is_channel?: boolean,
  is_group?: boolean,
  is_im?: boolean,
  created?: number,
  creator?: string,
  is_archived?: boolean,
  is_general?: boolean,
  unlinked?: number,
  name_normalized?: string,
  is_shared?: boolean,
  is_ext_shared?: boolean,
  is_org_shared?: boolean,
  pending_shared?: [],
  is_pending_ext_shared?: boolean,
  is_member?: boolean,
  is_private?: boolean,
  is_mpim?: boolean,
  topic?: IChannelInfo
  purpose?: IChannelInfo,
  previous_names?: string[],
  num_members?: number
}

interface IChannelInfo {
  value: string,
  creator: string,
  last_set: number
}

export interface ITodosBySection {
  section: StandupSection;
  todos: Todo[]
}

export interface ITab extends Vue {
  name?: string;
  isActive?: boolean;
}

export interface IEmptyState {
  title: string;
  content?: string;
  action: string;
}

export type StandupSection = 'past' | 'present' | 'blocker'

export type BlockType = 'context' | 'section' | 'divider'

export interface IBlockContent {
  type: 'mrkdwn' | string;
  text: string | null;
}

export interface IUrls {
  name: string;
  match: string;
  prepend: string;
  append?: string;
}
