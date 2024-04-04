import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';

import { LOCALE } from 'constants/common';
import viMessages from './messages/vi-VN.json';
import enMessages from './messages/en-US.json';

const AppLocale = {
  [LOCALE.VIETNAMESE]: {
    messages: viMessages,
    antd: viVN,
  },
  [LOCALE.ENGLISH]: {
    messages: enMessages,
    antd: enUS,
  },
};

export default AppLocale;
