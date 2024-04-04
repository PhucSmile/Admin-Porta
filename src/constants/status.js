export const ORDER_STATUSES = [
  'order',
  'packing',
  'delivering',
  'completed',
  'canceled',
  'refunded',
  'pending',
  'on_hold',
  'failed',
  'pending_payment',
];

export const ORDER_STATUS = ORDER_STATUSES.reduce((obj, curr) => {
  obj[curr.toUpperCase()] = curr;

  return obj;
}, {});

export const SMS_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  null: 'null',
};
