/* eslint-disable no-template-curly-in-string */
export const PATH_NAME = {
  ROOT: '/',
  LOGIN: '/login',
  SETTING: '/setting',
  HISTORY: '/history',
  PENDING: '/pending',
  TRANSACTION: '/transactions',
  RULE: '/rules',
  SPORT: '/sports',
};

export const ROLE = {
  ADMIN: 'Admin',
  USER: 'User',
};

export const STORAGE_KEY = {
  TOKEN: 'token',
};

export const LOCALE = {
  VIETNAMESE: 'vi',
  ENGLISH: 'en',
};

export const LOCALES = [
  {
    id: LOCALE.VIETNAMESE,
    name: `locale.${LOCALE.VIETNAMESE}`,
  },
  {
    id: LOCALE.ENGLISH,
    name: `locale.${LOCALE.ENGLISH}`,
  },
];

export const validateMessages = {
  [LOCALE.ENGLISH]: {
    required: '${label} is required',
  },
  [LOCALE.VIETNAMESE]: {
    required: '${label} bắt buộc',
  },
};

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

export const TEXT_DEFAULT = {
  NA: 'N/A',
};

export const DATE_FORMAT = "MM/DD/YYYY"

export const CHART_FILTER = ['year', 'month', 'week'];
