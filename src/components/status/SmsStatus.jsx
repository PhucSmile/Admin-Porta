import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Tag } from 'antd';
import { SMS_STATUS } from 'constants/status';

const StyledSmsStatus = styled(Tag)`
  margin-right: 0;
  border: none;
  border-radius: 4px;
`;

const MAPPING = {
  [SMS_STATUS.SUCCESS]: {
    color: 'var(--white)',
    backgroundColor: 'var(--green600)',
  },
  [SMS_STATUS.FAIL]: {
    color: 'var(--white)',
    backgroundColor: 'var(--red600)',
  },
  [SMS_STATUS.null]: {
    color: 'var(--white)',
    backgroundColor: 'var(--gray600)',
  },
};

export const SmsStatus = ({ status }) => {
  const intl = useIntl();

  return (
    <StyledSmsStatus style={MAPPING[status]}>
      {intl.formatMessage({ id: `common.status.sms.${status}` })}
    </StyledSmsStatus>
  );
};
