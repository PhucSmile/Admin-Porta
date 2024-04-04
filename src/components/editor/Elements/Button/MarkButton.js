import { StyledButton } from 'styles/overrides';
import { isMarkActive, toggleMark } from '../../utils/SlateUtils';

export const MarkButton = ({ editor, format, icon: Icon }) => {
  return (
    <StyledButton
      active={isMarkActive(editor, format).toString()}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={<Icon />}
    ></StyledButton>
  );
};
