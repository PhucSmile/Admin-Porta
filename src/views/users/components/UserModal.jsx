import { useMemo } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import { useResetFormOnCloseModal } from 'hooks/useResetFormOnCloseModal';
import { Modal } from 'components/modal/Modal';
import { Notification } from 'components/Notification';
import { UserForm } from './UserForm';
import { useCreateUser, useUpdateUser } from 'api/userApi';

export const UserModal = ({ onSuccess, initialValues, ...props }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const mutation = useMemo(
    () => (initialValues ? updateUserMutation : createUserMutation),
    [initialValues, updateUserMutation, createUserMutation],
  );

  useResetFormOnCloseModal({
    form,
    open: props?.open,
  });

  const handleSubmitData = (values) => {
    if (initialValues?.id) {
      values.userId = initialValues.id;
    }

    mutation.mutate(values, {
      onSuccess: () => {
        Notification(
          'success',
          intl.formatMessage({
            id: `message.${initialValues ? 'updateSuccess' : 'createSuccess'}`,
          }),
        );
        onSuccess();
      },
      onError: (error) => {
        const isError = error?.errors?.email || error?.errors?.phone;

        Notification(
          'error',
          intl.formatMessage({
            id: `message.${isError ? 'existEmailOrPhone' : 'commonError'}`,
          }),
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
        loading: createUserMutation.isLoading,
      }}
      {...props}
    >
      <UserForm form={form} initialValues={initialValues} />
    </Modal>
  );
};
