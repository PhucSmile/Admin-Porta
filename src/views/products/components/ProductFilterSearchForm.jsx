import { useIntl } from 'react-intl';

import { DEFAULT_PAGINATION } from 'constants/common';
import { FilterForm } from 'components/form';
import {
  StyledSpace,
  StyledFormItem,
  StyledInputSearch,
  StyledInput,
} from 'styles/overrides';
import { normalizeSearchData, normalizeSubmitSearchData } from 'utils/common';

export const ProductFilterSearchForm = ({ onSubmit, initialValues }) => {
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
                  id: 'common.placeholder.searchProduct',
                })}
                onSearch={form.submit}
              />
            </StyledFormItem>
          )}
        </StyledFormItem>

        <StyledFormItem name="price">
          <StyledInput
            placeholder={intl.formatMessage({
              id: 'common.placeholder.orderPrice',
            })}
            $customType="filter"
          />
        </StyledFormItem>
      </StyledSpace>
    </FilterForm>
  );
};
