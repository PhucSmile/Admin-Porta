import _ from 'lodash';
import moment from 'moment';

export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const serializeSearchParams = (params) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value),
  );
};

// (page - 1) * limit + index + 1,
// total - index - (page - 1) * limit
export const calcIndexByOrder = (
  { total, index, page, limit },
  type = 'ASC',
) => {
  return type === 'ASC'
    ? (page - 1) * limit + index + 1
    : total - index - (page - 1) * limit;
};

export const calcCurrentPageWithNum = ({
  page = 1,
  limit = 10,
  total = 0,
  num = 1,
}) => {
  const calculatedPage = Math.ceil((total - num) / limit) || 1;

  return calculatedPage >= page ? page : calculatedPage;
};

export const formatterCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const removeFalsyKeys = (object, optionalFunc) => {
  return _.pickBy(object, optionalFunc);
};

export const normalizeSubmitSearchData = ({ fromDate, toDate, ...data }) => {
  return removeFalsyKeys({
    ...data,
    fromDate: fromDate?.toISOString(),
    toDate: toDate?.toISOString(),
  });
};

export const normalizeSearchData = ({ fromDate, toDate, ...data }) => {
  return {
    ...data,
    fromDate: fromDate ? moment(fromDate) : null,
    toDate: toDate ? moment(toDate) : null,
  };
};

export const getFirstTitleFromBreadcrumbs = (breadcrumbs) => {
  return _.get(breadcrumbs, [0, 'label']);
};
