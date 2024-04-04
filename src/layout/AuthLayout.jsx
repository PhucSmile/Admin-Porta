import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import bgImg from 'assets/images/auth-bg.png';
import { Footer } from './components/Footer';

const StyledAuthLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${bgImg}) no-repeat center;
  background-size: cover;
  position: relative;
`;

export default function AuthLayout() {
  return (
    <StyledAuthLayout>
      <Outlet />

      <Footer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
        }}
      />
    </StyledAuthLayout>
  );
}
