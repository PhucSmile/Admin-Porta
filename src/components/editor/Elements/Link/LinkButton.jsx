import { StyledButton } from 'styles/overrides';
import { insertLink } from '../../utils/link';
import { isBlockActive } from '../../utils/SlateUtils';

export const LinkButton = ({ editor, icon: Icon }) => {
  return (
    <StyledButton
      active={isBlockActive(editor, 'link').toString()}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
      icon={<Icon />}
    />
  );
};
