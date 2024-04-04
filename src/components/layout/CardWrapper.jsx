import styled from 'styled-components';

const StyledCardWrapper = styled.div`
  padding: 16px;
  border: 1px solid var(--gray300);
  border-radius: 4px;
`;

export const CardWrapper = ({ children, ...props }) => {
  return <StyledCardWrapper {...props}>{children}</StyledCardWrapper>;
};
