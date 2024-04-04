import { useIntl } from 'react-intl';
import { Select } from 'antd';

import { DownloadIcon } from 'assets/icons';
import { DEFAULT_PAGINATION } from 'constants/common';
import { FilterForm } from 'components/form';
import { StyledFormItem, StyledSelect, StyledButton } from 'styles/overrides';
import { normalizeSearchData, normalizeSubmitSearchData } from 'utils/common';

export const SaleRankReportFilter = ({
  onSubmit,
  initialValues,
  years = [],
}) => {
  const intl = useIntl();

  const handleSubmit = (values) => {
    onSubmit(
      normalizeSubmitSearchData({
        ...initialValues,
        ...values,
        page: DEFAULT_PAGINATION.PAGE,
      }),
    );
  };

  return (
    <FilterForm
      onFinish={handleSubmit}
      initialValues={normalizeSearchData(initialValues)}
      extraActions={
        <StyledButton icon={<DownloadIcon />}>
          {intl.formatMessage({ id: 'common.btn.downloadExcel' })}
        </StyledButton>
      }
    >
      <StyledFormItem name="yearSaleRank">
        <StyledSelect
          $customType="filter"
          placeholder={intl.formatMessage({
            id: 'views.dashboard.form.placeholder.yearSaleRank',
          })}
        >
          {years.map((year) => (
            <Select.Option key={year} value={year}>
              {year}
            </Select.Option>
          ))}
        </StyledSelect>
      </StyledFormItem>
    </FilterForm>
  );
};
