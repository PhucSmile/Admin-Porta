import _ from 'lodash';
import moment from 'moment';
import { DATE_FORMAT } from 'constants/common';
import { PATH_NAME } from 'constants/routes';

export const normalizeOrderData = (data = {}) => {
  let {
    livestreamDate = null,
    status = null,
    note = null,
    orderAddress = {},
    items = [],
  } = data;

  orderAddress = _.pick(orderAddress, [
    'fullName',
    'email',
    'phone',
    'address',
    'provinceId',
    'districtId',
  ]);

  items = items.map(
    ({ productId, productName, quantity, price, productCode, id }) => ({
      productId,
      name: productName,
      price: +price,
      quantity,
      code: productCode,
      id,
    }),
  );

  return {
    livestreamDate: livestreamDate ? moment(livestreamDate, DATE_FORMAT) : null,
    status,
    note,
    orderAddress,
    items,
  };
};

export const normalizeSubmitData = (data, isUpdate = false) => {
  data.livestreamDate = data.livestreamDate?.format(DATE_FORMAT);
  let items = data?.items.map(({ quantity, price, productId }) => ({
    quantity,
    price: +price,
    productId,
  }));

  let order_item = {
    items: items,
    livestreamDate: data?.livestreamDate,
  };

  if (isUpdate) {
    return {
      status: data?.status,
      isPhoneChanged: data?.isPhoneChanged,
      phone: data?.orderAddress?.phone,
      fullName: data?.orderAddress?.fullName,
      email: data?.orderAddress?.email,
      provinceId: data?.orderAddress?.provinceId,
      districtId: data?.orderAddress?.districtId,
      address: data?.orderAddress?.address,
      items: order_item,
    };
  }

  return data;
};

export const getPublicOrderLink = (code) =>
  `${window.location.origin}${PATH_NAME.CUSTOMER_ORDER}?code=${code}`;
