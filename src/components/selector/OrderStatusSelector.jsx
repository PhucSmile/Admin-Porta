import { useIntl } from 'react-intl';
import { Select } from 'antd';

import { ORDER_STATUSES } from 'constants/status';
import { StyledSelect } from 'styles/overrides';

export const OrderStatusSelector = ({ onChange, value, ...restProps }) => {
  const intl = useIntl();

  return (
    <StyledSelect {...restProps} onChange={onChange} value={value}>
      {ORDER_STATUSES.map((status) => (
        <Select.Option key={status} value={status}>
          {intl.formatMessage({
            id: `common.status.order.${status}`,
          })}
        </Select.Option>
      ))}
    </StyledSelect>
  );
};
