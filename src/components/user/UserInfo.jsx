import styled from 'styled-components';
import { Grid } from 'antd';
import {
  StyledSpace,
  StyledAvatar,
  StyledTypographyParagraph,
} from 'styles/overrides';
import { UserRole } from './UserRole';

const StyledUserInfo = styled.div`
  .ant-typography {
    color: ${({ isVertical }) =>
      isVertical ? 'var(--white)' : 'var(--gray10)'};
    margin-bottom: 0;
    font-size: 16px;
  }
`;

export const UserInfo = ({
  isVertical = false,
  fullName,
  role,
  isCollapsed = false,
}) => {
  const screens = Grid.useBreakpoint();

  return (
    <StyledUserInfo isVertical={isVertical}>
      <StyledSpace
        direction={isVertical ? 'vertical' : 'horizontal'}
        align="center"
      >
        <StyledAvatar size={40}>U</StyledAvatar>

        {!isCollapsed && (
          <StyledTypographyParagraph>{fullName}</StyledTypographyParagraph>
        )}

        {screens.xs && <UserRole role={role} />}
      </StyledSpace>
    </StyledUserInfo>
  );
};
