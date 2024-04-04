import { useIntl } from 'react-intl';
import { Select } from 'antd';
import { SMS_STATUS } from 'constants/status';
import { StyledSelect } from 'styles/overrides';

export const SmsStatusSelector = ({ onChange, value, ...restProps }) => {
  const intl = useIntl();

  return (
    <StyledSelect {...restProps} onChange={onChange} value={value}>
      {Object.values(SMS_STATUS).map((status) => (
        <Select.Option key={status} value={status}>
          {intl.formatMessage({
            id: `common.status.sms.${status}`,
          })}
        </Select.Option>
      ))}
    </StyledSelect>
  );
};
