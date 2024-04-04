import { useIntl } from 'react-intl';

import { DEFAULT_PAGINATION } from 'constants/common';
import { FilterForm } from 'components/form';
import {
  StyledSpace,
  StyledFormItem,
  StyledInputSearch,
} from 'styles/overrides';
import { normalizeSearchData, normalizeSubmitSearchData } from 'utils/common';

export const CustomerFilterSearchForm = ({ onSubmit, initialValues }) => {
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
        <StyledFormItem noStyle shouldUpdate>
          {(form) => (
            <StyledFormItem name="search">
              <StyledInputSearch
                $customType="filter"
                placeholder={intl.formatMessage({
                  id: 'common.placeholder.searchCustomer',
                })}
                onSearch={form.submit}
              />
            </StyledFormItem>
          )}
        </StyledFormItem>
      </StyledSpace>
    </FilterForm>
  );
};
