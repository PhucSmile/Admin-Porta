import _ from 'lodash';

export const normalizeSubmitData = (data) => {
  data = {
    ...data,
    districtId: data.defaultAddress.districtId,
    provinceId: data.defaultAddress.provinceId,
    address: data.defaultAddress.address,
  };
  return data;
};

export const normalizeInitialValues = (data) => {
  if (_.isNil(data)) {
    return data;
  }

  return {
    ...data,
  };
};
