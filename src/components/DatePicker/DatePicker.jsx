import { DATE_FORMAT } from 'constants/common';
import { StyledDatePicker } from 'styles/overrides';
import locale from 'antd/es/date-picker/locale/en_US';

export const DatePicker = (props) => {
  return (
    <StyledDatePicker
      locale={locale}
      format={DATE_FORMAT}
      placeholder="mm/dd/yyyy"
      {...props}
    />
  );
};
