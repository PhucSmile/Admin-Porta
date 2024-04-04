import PropTypes from 'prop-types';
import styled from 'styled-components';
import LogoImg from 'assets/images/logo.png';

import { StyledTypographyTitle } from 'styles/overrides';

const StyledLayout = styled.div`
  max-width: 412px;
  width: 100%;
  padding: 56px 72px;
  border-radius: 8px;
  background-color: var(--white);
  @media (max-width: 550px) {
    max-width: 350px;
    padding: 36px 42px;
  }

  > .ant-typography {
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 40px;
    color: var(--primary);
    text-align: center;
  }
  .logo-image {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }
`;

export const Layout = ({ title, children }) => {
  return (
    <StyledLayout>
      <div className="logo-image">
        <img src={LogoImg} alt="logo" />
      </div>
      <StyledTypographyTitle level={2}>{title}</StyledTypographyTitle>
      {children}
    </StyledLayout>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
