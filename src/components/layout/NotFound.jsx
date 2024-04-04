import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Result } from 'antd';

import { PATH_NAME } from 'constants/routes';
import { StyledButton } from 'styles/overrides';

const StyledNotFound = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFound = () => {
  const intl = useIntl();

  return (
    <StyledNotFound>
      <Result
        status="403"
        title={intl.formatMessage({ id: 'layout.notFound.title' })}
        subTitle={intl.formatMessage({ id: 'layout.notFound.desc' })}
        extra={
          <Link to={PATH_NAME.ROOT}>
            <StyledButton type="primary">
              {intl.formatMessage({ id: 'common.btn.backHome' })}
            </StyledButton>
          </Link>
        }
        style={{ padding: 0 }}
      />
    </StyledNotFound>
  );
};
