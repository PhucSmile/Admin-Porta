import { Select } from 'antd';
import { StyledSelect } from 'styles/overrides';
import { addMarkData, activeMark } from '../../utils/SlateUtils';

export const Dropdown = ({ format, options, editor }) => {
  const changeMarkData = (value, format) => {
    addMarkData(editor, { format, value });
  };

  return (
    <StyledSelect
      style={{ width: 80 }}
      onChange={(value) => {
        changeMarkData(value, format);
      }}
      value={activeMark(editor, format)}
    >
      <Select.Option value="14px">14px</Select.Option>
      <Select.Option value="16px">16px</Select.Option>
      <Select.Option value="18px">18px</Select.Option>
    </StyledSelect>
  );
};
