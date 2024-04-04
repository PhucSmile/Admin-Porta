import styled from 'styled-components';

const StyledSettingLayout = styled.div`
  .title {
    padding: 10px;
    background-color: var(--blue200);
    color: var(--gray900);
    font-size: 18px;
    font-weight: 700;
  }

  .title + .content {
    margin-top: 16px;
  }

  & + & {
    margin-top: 44px;
  }
`;

export const SettingLayout = ({ children, title }) => {
  return (
    <StyledSettingLayout>
      <div className="title">{title}</div>

      <div className="content">{children}</div>
    </StyledSettingLayout>
  );
};
