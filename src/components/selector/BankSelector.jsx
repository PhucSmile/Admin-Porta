import { Select } from 'antd';
import { StyledSelect, StyledImgOption } from 'styles/overrides';
import { useBanks } from 'api/bankApi';

export const BankSelector = ({ onChange, value, ...restProps }) => {
  const { data = [], isLoading } = useBanks();

  return (
    <StyledSelect
      {...restProps}
      loading={isLoading}
      onChange={onChange}
      value={value}
    >
      {data.length > 0 &&
        data.map(({ id, fullName, name, logoUrl }) => (
          <Select.Option key={id} value={id}>
            <StyledImgOption src={logoUrl} alt="" />
            {name} - {fullName}
          </Select.Option>
        ))}
    </StyledSelect>
  );
};
