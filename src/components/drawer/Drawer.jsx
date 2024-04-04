import { StyledDrawer } from 'styles/overrides';
import { CloseIcon } from 'assets/icons';

export const Drawer = (props) => {
  return <StyledDrawer size="large" closeIcon={<CloseIcon />} {...props} />;
};
