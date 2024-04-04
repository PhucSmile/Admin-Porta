import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import bgImg from 'assets/images/auth-bg.png';
import { Footer } from './components/Footer';

const StyledIndexLayout = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 32px 32px 0;
  background: url(${bgImg}) no-repeat center;
  background-size: cover;
  display: 'flex';
  flex-direction: column;
  position: relative;
`;

export default function IndexLayout() {
  return (
    <StyledIndexLayout>
      <Outlet />

      <Footer
      // style={{
      //   position: 'absolute',
      //   bottom: 0,
      //   left: 0,
      //   right: 0,
      //   backgroundColor: 'transparent',
      // }}
      />
    </StyledIndexLayout>
  );
}
