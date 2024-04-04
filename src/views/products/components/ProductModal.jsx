import { useMemo } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import { useResetFormOnCloseModal } from 'hooks/useResetFormOnCloseModal';
import { Modal } from 'components/modal/Modal';
import { Notification } from 'components/Notification';
import { ProductForm } from './ProductForm';
import { useCreateProduct, useUpdateProduct } from 'api/productApi';
import { normalizeSubmitData, normalizeInitialValues } from '../utils';

export const ProductModal = ({ initialValues, onSuccess, ...props }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const newInitialValues = useMemo(
    () => normalizeInitialValues(initialValues),
    [initialValues],
  );
  const mutation = useMemo(
    () => (newInitialValues ? updateProductMutation : createProductMutation),
    [newInitialValues, updateProductMutation, createProductMutation],
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
        loading: createProductMutation.isLoading,
      }}
      {...props}
    >
      <ProductForm form={form} initialValues={newInitialValues} />
    </Modal>
  );
};
