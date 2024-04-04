import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Grid } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { doLogout, getCurrentUser } from 'store/slices/authSlice';
import { getBreadcrumbs } from 'store/slices/layoutSlice';
import {
  StyledSpace,
  StyledLayoutHeader,
  StyledTriggerBtn,
  StyledButton,
} from 'styles/overrides';
import { ArrowHeadLeftIcon } from 'assets/icons';
import { HeaderBreadcrumb } from 'components/breadcrumb/HeaderBreadcrumb';
import { UserRole, UserInfo } from 'components/user';

export const Header = ({ onCollapse }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const screens = Grid.useBreakpoint();
  const currentUser = useSelector(getCurrentUser);
  const breadcrumbs = useSelector(getBreadcrumbs);

  return (
    <StyledLayoutHeader>
      <StyledSpace
        style={{
          justifyContent: 'space-between',
          width: '100%',
          paddingRight: 0,
        }}
      >
        <StyledSpace>
          <StyledTriggerBtn onClick={onCollapse}>
            <ArrowHeadLeftIcon />
          </StyledTriggerBtn>

          {screens.md && <HeaderBreadcrumb items={breadcrumbs} />}
        </StyledSpace>

        <StyledSpace size={0} className="right-block">
          <StyledButton
            type="text"
            style={{ fontSize: 16, fontWeight: 400, color: 'var(--dark)' }}
            onClick={() => dispatch(doLogout())}
          >
            {screens.xs ? (
              <LogoutOutlined />
            ) : (
              intl.formatMessage({ id: 'common.btn.logout' })
            )}
          </StyledButton>

          {!screens.xs && (
            <>
              <UserRole role={currentUser.role} />
              <UserInfo fullName={currentUser.fullName} />
            </>
          )}
        </StyledSpace>
      </StyledSpace>
    </StyledLayoutHeader>
  );
};
