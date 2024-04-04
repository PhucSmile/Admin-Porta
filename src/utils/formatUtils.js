import numeral from 'numeral';
import _ from 'lodash';

export const formatAddress = (addressObj) => {
  if (_.isNil(addressObj)) return null;

  const { address, district, province } = addressObj;

  return [address, district?.name, province?.name]
    .filter((item) => item)
    .join(', ');
};

export const formatCurrency = (number, format = '0,0') => {
  return numeral(number).format(format);
};

export const formatInputNumber = (value) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseInputNumber = (value) => value.replace(/\$\s?|(,*)/g, '');
