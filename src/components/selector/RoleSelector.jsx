import { Select } from 'antd';

import { ROLES } from 'constants/roles';
import { capitalizeLetter } from 'utils/stringUtils';
import { StyledSelect } from 'styles/overrides';

export const RoleSelector = ({ onChange, value, ...restProps }) => {
  return (
    <StyledSelect {...restProps} onChange={onChange} value={value}>
      {ROLES.map((role) => (
        <Select.Option key={role} value={role}>
          {capitalizeLetter(role)}
        </Select.Option>
      ))}
    </StyledSelect>
  );
};
