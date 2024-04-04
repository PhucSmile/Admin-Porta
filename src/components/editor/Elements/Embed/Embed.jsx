import { StyledButton } from 'styles/overrides';
import { insertEmbed } from '../../utils/embed';
import { isBlockActive } from '../../utils/SlateUtils';

export const Embed = ({ editor, format, icon: Icon }) => {
  return (
    <StyledButton
      active={isBlockActive(editor, format).toString()}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:');
        // if (url && !isImageUrl(url)) {
        //   alert('URL is not an image');
        //   return;
        // }
        url && insertEmbed(editor, { url }, format);
      }}
      icon={<Icon />}
    />
  );
};
