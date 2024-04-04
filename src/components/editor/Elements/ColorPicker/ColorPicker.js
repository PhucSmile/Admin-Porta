import React, { useState } from 'react';
import { ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { Popover } from 'antd';

import { colors } from './defaultColors.js';
import { addMarkData, activeMark } from '../../utils/SlateUtils';
import { StyledButton } from 'styles/overrides';
import { ColorOptions } from './ColorOptions';

export const ColorPicker = ({ format, editor, icon: Icon }) => {
  const [selection, setSelection] = useState();

  const handleChangeColor = (color) => {
    selection && Transforms.select(editor, selection);

    addMarkData(editor, { format, value: color });
    ReactEditor.focus(editor);
  };

  const toggleOption = () => {
    setSelection(editor.selection);
  };

  return (
    <Popover
      placement="bottom"
      content={
        <ColorOptions colors={colors} onChangeColor={handleChangeColor} />
      }
      trigger="click"
    >
      <StyledButton
        style={{
          color: activeMark(editor, format),
        }}
        onClick={toggleOption}
        icon={<Icon />}
      />
    </Popover>
  );
};
