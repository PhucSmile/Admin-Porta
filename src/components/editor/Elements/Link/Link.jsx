import { useSlate } from 'slate-react';
import { DisconnectOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { StyledSpace, StyledButton } from 'styles/overrides';
import { removeLink } from 'components/editor/utils/link';
import { isBlockActive } from 'components/editor/utils/SlateUtils';

export const Link = ({ attributes, children, element }) => {
  const editor = useSlate();

  return (
    <Tooltip
      placement="bottom"
      title={
        <StyledSpace>
          <a href={element.url} rel="noreferrer" target="_blank">
            {element.url}
          </a>
          <StyledButton
            size="small"
            icon={<DisconnectOutlined />}
            onMouseDown={() => {
              if (isBlockActive(editor, 'link')) {
                removeLink(editor);
              }
            }}
          />
        </StyledSpace>
      }
    >
      <a {...attributes} href={element.url}>
        {children}
      </a>
    </Tooltip>
  );
};
