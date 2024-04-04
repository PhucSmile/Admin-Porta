import { useIntl } from 'react-intl';
import { Select } from 'antd';

import { DEFAULT_PAGINATION, CHART_FILTER } from 'constants/common';
import { FilterForm } from 'components/form';
import { StyledSpace, StyledFormItem, StyledSelect } from 'styles/overrides';
import { normalizeSearchData, normalizeSubmitSearchData } from 'utils/common';

export const DashboardFilterSearchForm = ({ onSubmit, initialValues }) => {
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
    >
      <StyledSpace size={16}>
        <StyledFormItem name="groupBy">
          <StyledSelect $customType="filter">
            {CHART_FILTER.map((key) => (
              <Select.Option key={key} value={key}>
                {intl.formatMessage({
                  id: `views.dashboard.${key}`,
                })}
              </Select.Option>
            ))}
          </StyledSelect>
        </StyledFormItem>
      </StyledSpace>
    </FilterForm>
  );
};
