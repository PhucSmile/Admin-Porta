import moment from 'moment';

import { TEXT_DEFAULT, DATE_FORMAT } from 'constants/common';

export const formatTime = (time, type = DATE_FORMAT) => {
  const ISOTime = moment(time, moment.ISO_8601);

  if (ISOTime.isValid()) {
    return moment(time).format(type);
  }

  return time || TEXT_DEFAULT.NA;
};
