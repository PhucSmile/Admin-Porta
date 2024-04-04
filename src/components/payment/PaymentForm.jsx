import { useIntl } from 'react-intl';
import { StyledForm, StyledFormItem, StyledInput } from 'styles/overrides';
import { BankSelector } from 'components/selector/BankSelector';

export const PaymentForm = ({ onSuccess, ...props }) => {
  const intl = useIntl();

  return (
    <StyledForm layout="vertical" size="large" {...props}>
      <StyledFormItem
        label={intl.formatMessage({ id: 'views.settings.form.label.bank' })}
        name="bankId"
        rules={[{ required: true }]}
      >
        <BankSelector
          placeholder={intl.formatMessage({
            id: 'views.settings.form.placeholder.bank',
          })}
        />
      </StyledFormItem>

      <StyledFormItem
        label={intl.formatMessage({
          id: 'views.settings.form.label.accountNumber',
        })}
        name="bankAccountNumber"
        rules={[{ required: true }]}
      >
        <StyledInput
          placeholder={intl.formatMessage({
            id: 'views.settings.form.placeholder.accountNumber',
          })}
        />
      </StyledFormItem>

      <StyledFormItem
        label={intl.formatMessage({
          id: 'views.settings.form.label.accountName',
        })}
        name="bankAccountOwner"
        rules={[{ required: true }]}
      >
        <StyledInput
          placeholder={intl.formatMessage({
            id: 'views.settings.form.placeholder.accountName',
          })}
        />
      </StyledFormItem>

      <StyledFormItem
        label={intl.formatMessage({
          id: 'views.settings.form.label.branchName',
        })}
        name="bankBranch"
        rules={[{ required: true }]}
      >
        <StyledInput
          placeholder={intl.formatMessage({
            id: 'views.settings.form.placeholder.branchName',
          })}
        />
      </StyledFormItem>
    </StyledForm>
  );
};
