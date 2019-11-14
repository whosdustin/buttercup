export interface RootState {
  notifications?: INotification[];
  channels?: IChannel[];
  channel: IChannel | null;
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
