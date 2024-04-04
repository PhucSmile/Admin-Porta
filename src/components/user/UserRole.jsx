import styled from 'styled-components';
import { capitalizeLetter } from 'utils/stringUtils';

const StyledUserRole = styled.div`
  font-size: 14px;
  display: inline-block;
  color: var(--gray700);
  border: 1px solid var(--gray300);
  border-radius: 4px;
  padding: 7px 12px;
  background-color: var(--white);
`;

export const UserRole = ({ role }) => {
  return <StyledUserRole>{capitalizeLetter(role)}</StyledUserRole>;
};
