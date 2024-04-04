import styled from 'styled-components';

const SplashScreenContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f80d0d;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default function SplashScreen() {
  return (
    <SplashScreenContainer>
      <img src="" alt="" />
    </SplashScreenContainer>
  );
}
