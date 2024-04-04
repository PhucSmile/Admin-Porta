import styled from 'styled-components';
import { useSlate } from 'slate-react';

import { StyledSpace } from 'styles/overrides';
import { Embed } from '../Embed';
import { LinkButton } from '../Link';
import { ColorPicker } from '../ColorPicker';
import { Dropdown } from '../Dropdown';
import { MarkButton, BlockButton } from '../Button';
import { TOOLBAR_OPTIONS } from './options';

const StyledToolbar = styled(StyledSpace)`
  padding: 7px 12px;
  border-bottom: 1px solid var(--gray300);

  > * + * {
    padding-left: 8px;
    margin-left: 8px;
    position: relative;

    &::before {
      content: '';
      width: 1px;
      height: 12px;
      display: inline-block;
      background-color: var(--gray300);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  button {
    padding: 0;
    border: none;

    &[ant-click-animating-without-extra-node='true']::after,
    .ant-click-animating-node {
      content: none;
    }
  }
`;

export const Toolbar = () => {
  const editor = useSlate();

  return (
    <StyledToolbar size={0}>
      {TOOLBAR_OPTIONS.map((group, index) => (
        <div key={index}>
          {group.map((element) => {
            switch (element.type) {
              case 'block': {
                return (
                  <BlockButton key={element.id} {...element} editor={editor} />
                );
              }

              case 'mark': {
                return (
                  <MarkButton key={element.id} {...element} editor={editor} />
                );
              }

              case 'link': {
                return (
                  <LinkButton key={element.id} {...element} editor={editor} />
                );
              }

              case 'embed': {
                return <Embed key={element.id} {...element} editor={editor} />;
              }

              case 'color-picker': {
                return (
                  <ColorPicker key={element.id} {...element} editor={editor} />
                );
              }

              case 'dropdown': {
                return (
                  <Dropdown key={element.id} {...element} editor={editor} />
                );
              }

              default: {
                return null;
              }
            }
          })}
        </div>
      ))}
    </StyledToolbar>
  );
};
