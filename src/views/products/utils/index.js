import _ from 'lodash';
import moment from 'moment';
import { DATE_FORMAT } from 'constants/common';

export const normalizeSubmitData = (data) => {
  return data;
};

export const normalizeInitialValues = (data) => {
  if (_.isNil(data)) {
    return data;
  }

  return {
    ...data,
    livestreamDate: data.livestreamDate
      ? moment(data.livestreamDate, DATE_FORMAT)
      : null,
  };
};
