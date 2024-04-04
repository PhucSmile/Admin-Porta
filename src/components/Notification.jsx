import { notification } from 'antd';

import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import {
  COLOR_INFO,
  COLOR_SUCCESS,
  COLOR_WARNING,
  COLOR_ERROR,
} from 'constants/colors';

const NOTIFICATION = {
  info: {
    icon: InfoCircleOutlined,
    color: COLOR_INFO,
  },
  success: {
    icon: CheckCircleOutlined,
    color: COLOR_SUCCESS,
  },
  warning: {
    icon: ExclamationCircleOutlined,
    color: COLOR_WARNING,
  },
  error: {
    icon: CloseCircleOutlined,
    color: COLOR_ERROR,
  },
};

export const Notification = (
  type,
  message = '',
  description = '',
  duration = 3,
) => {
  const Icon = NOTIFICATION[type].icon;

  notification[type]({
    message,
    description,
    duration,
    icon: <Icon />,
    style: { backgroundColor: NOTIFICATION[type].color },
  });
};

export default Notification;
