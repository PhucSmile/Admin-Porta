import { Form } from 'antd';
import { useIntl } from 'react-intl';
import { useResetFormOnCloseModal } from 'hooks/useResetFormOnCloseModal';
import { Modal } from 'components/modal/Modal';
import { Notification } from 'components/Notification';
import { CustomerForm } from './CustomerForm';
import { useCreateCustomer, useUpdateCustomer } from 'api/customerApi';
import { useMemo } from 'react';
import { normalizeInitialValues, normalizeSubmitData } from '../utils';

export const CustomerModal = ({ initialValues, onSuccess, ...props }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const createCustomerMutation = useCreateCustomer();
  const updateCustomerMutation = useUpdateCustomer();

  const newInitialValues = useMemo(
    () => normalizeInitialValues(initialValues),
    [initialValues],
  );
  const mutation = useMemo(
    () => (newInitialValues ? updateCustomerMutation : createCustomerMutation),
    [newInitialValues, updateCustomerMutation, createCustomerMutation],
  );

  useResetFormOnCloseModal({
    form,
    open: props?.open,
  });

  const handleSubmitData = (values) => {
    const data = normalizeSubmitData(values);

    if (newInitialValues?.id) {
      data.id = newInitialValues.id;
    }


    mutation.mutate(data, {
      onSuccess: () => {
        Notification(
          'success',
          intl.formatMessage({
            id: `message.${initialValues ? 'updateSuccess' : 'createSuccess'}`,
          }),
        );
        onSuccess();
      },
      onError: () => {
        Notification(
          'error',
          intl.formatMessage({ id: 'message.commonError' }),
        );
      },
    });
  };

  return (
    <Modal
      title={intl.formatMessage({
        id: `common.modal.${initialValues ? 'editTitle' : 'addNewTitle'}`,
      })}
      onOk={() => {
        form.validateFields().then(handleSubmitData);
      }}
      okButtonProps={{
        loading: createCustomerMutation.isLoading,
      }}
      {...props}
    >
      <CustomerForm form={form} initialValues={newInitialValues} />
    </Modal>
  );
};
