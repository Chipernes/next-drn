import {
  Edit,
  CloudUpload,
  Close,
  ChevronLeft,
  CheckCircleOutlined,
  Check,
  CalendarTodayOutlined,
  Block,
  Brightness1,
  AddCircle,
  Add,
  Settings,
  Loop,
  FiberManualRecordRounded,
  ErrorOutline,
  ExpandMore,
  Schedule,
  NotificationsNone,
  Clear,
  MoreVert,
  PlayCircleOutlineOutlined,
  Remove,
  ContentCopyRounded,
  OpenInNew,
  Download,
  Refresh,
  HourglassEmpty,
  DeleteForever,
  TaskAlt,
  MailOutline,
  Campaign,
  Lan,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon';
import { FC } from 'react';

export enum Icons {
  add = 'add',
  addCircle = 'addCircle',
  block = 'block',
  brightness1 = 'brightness1',
  calendarOutline = 'calendarOutline',
  campaign = 'campaign',
  check = 'check',
  checkCircle = 'checkCircle',
  chevronLeft = 'chevronLeft',
  clear = 'clear',
  close = 'close',
  contentCopy = 'contentCopy',
  edit = 'edit',
  errorOutline = 'errorOutline',
  expandMoreIcon = 'expandMoreIcon',
  fiberManualRecordRounded = 'fiberManualRecordRounded',
  loop = 'loop',
  mail = 'mail',
  moreVertical = 'moreVertical',
  notificationsNone = 'notificationsNone',
  openInNew = 'openInNew',
  playCircleOutline = 'playCircleOutline',
  remove = 'remove',
  schedule = 'schedule',
  settings = 'settings',
  upload = 'upload',
  donwload = 'download',
  refresh = 'refresh',
  hourglass = 'hourglass',
  deletedForever = 'deletedForever',
  taskAlt = 'taskAlt',
  lan = 'lan',
}

const iconMapper = {
  [Icons.add]: Add,
  [Icons.addCircle]: AddCircle,
  [Icons.block]: Block,
  [Icons.brightness1]: Brightness1,
  [Icons.campaign]: Campaign,
  [Icons.calendarOutline]: CalendarTodayOutlined,
  [Icons.check]: Check,
  [Icons.checkCircle]: CheckCircleOutlined,
  [Icons.chevronLeft]: ChevronLeft,
  [Icons.clear]: Clear,
  [Icons.close]: Close,
  [Icons.contentCopy]: ContentCopyRounded,
  [Icons.edit]: Edit,
  [Icons.errorOutline]: ErrorOutline,
  [Icons.expandMoreIcon]: ExpandMore,
  [Icons.fiberManualRecordRounded]: FiberManualRecordRounded,
  [Icons.loop]: Loop,
  [Icons.mail]: MailOutline,
  [Icons.moreVertical]: MoreVert,
  [Icons.notificationsNone]: NotificationsNone,
  [Icons.openInNew]: OpenInNew,
  [Icons.playCircleOutline]: PlayCircleOutlineOutlined,
  [Icons.remove]: Remove,
  [Icons.schedule]: Schedule,
  [Icons.settings]: Settings,
  [Icons.upload]: CloudUpload,
  [Icons.donwload]: Download,
  [Icons.refresh]: Refresh,
  [Icons.hourglass]: HourglassEmpty,
  [Icons.deletedForever]: DeleteForever,
  [Icons.taskAlt]: TaskAlt,
  [Icons.lan]: Lan,
};

type IconProps = {
  name: Icons;
};

const Icon: FC<SvgIconProps & IconProps> = (props) => {
  const { name, ...rest } = props;
  const IconName = iconMapper[name];
  return (
    <IconName { ...rest } />
  );
};

export default Icon;
