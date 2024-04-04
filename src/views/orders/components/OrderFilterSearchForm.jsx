import { useIntl } from 'react-intl';

import { DEFAULT_PAGINATION } from 'constants/common';
import { FilterForm } from 'components/form';
import { DatePicker } from 'components/DatePicker/DatePicker';
import { OrderStatusSelector, SmsStatusSelector } from 'components/selector';
import {
  StyledSpace,
  StyledFormItem,
  StyledInputSearch,
  StyledInput,
} from 'styles/overrides';
import { normalizeSearchData, normalizeSubmitSearchData } from 'utils/common';

export const OrderFilterSearchForm = ({ onSubmit, initialValues }) => {
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
                  id: 'common.placeholder.searchOrder',
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

        <StyledFormItem name="status">
          <OrderStatusSelector
            placeholder={intl.formatMessage({
              id: 'common.placeholder.orderStatus',
            })}
            allowClear
            $customType="filter"
          />
        </StyledFormItem>

        <StyledFormItem name="sms_status">
          <SmsStatusSelector
            placeholder={intl.formatMessage({
              id: 'common.placeholder.smsStatus',
            })}
            allowClear
            $customType="filter"
          />
        </StyledFormItem>

        <StyledFormItem name="fromDate">
          <DatePicker
            placeholder={intl.formatMessage({
              id: 'common.placeholder.fromDate',
            })}
            $customType="filter"
          />
        </StyledFormItem>

        <StyledFormItem name="toDate">
          <DatePicker
            placeholder={intl.formatMessage({
              id: 'common.placeholder.toDate',
            })}
            $customType="filter"
          />
        </StyledFormItem>

        <StyledFormItem noStyle shouldUpdate>
          {(form) => (
            <StyledFormItem name="noteAdmin">
              <StyledInputSearch
                $customType="filter"
                placeholder={intl.formatMessage({
                  id: 'common.placeholder.searNoteAdmin',
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
