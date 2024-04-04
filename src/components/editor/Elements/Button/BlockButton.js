import { StyledButton } from 'styles/overrides';
import {
  toggleBlock,
  isBlockActiveMain,
  TEXT_ALIGN_TYPES,
} from '../../utils/SlateUtils';

export const BlockButton = ({ editor, format, icon: Icon }) => {
  return (
    <StyledButton
      active={isBlockActiveMain(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
      ).toString()}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      icon={<Icon />}
    ></StyledButton>
  );
};
