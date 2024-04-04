import { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'antd';

import { Modal } from 'components/modal';
import { PaymentForm } from 'components/payment';
import { PlusIcon } from 'assets/icons';
import { StyledButton } from 'styles/overrides';
import { SettingLayout } from './SettingLayout';
import { PaymentList } from 'components/payment';
import {
  useBankSettings,
  useDeleteBankSetting,
  useCreateBankSetting,
  useUpdateBankSetting,
} from 'api/bankSettingApi';
import { Notification } from 'components/Notification';

export const PaymentSetting = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { data = [], refetch } = useBankSettings();
  const deleteBankSettingMutation = useDeleteBankSetting();
  const createBankSettingMutation = useCreateBankSetting();
  const updateBankSettingMutation = useUpdateBankSetting();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bank, setBank] = useState(null);

  const submitMutation = useMemo(() => {
    return bank ? updateBankSettingMutation : createBankSettingMutation;
  }, [bank, createBankSettingMutation, updateBankSettingMutation]);

  const handleCancelModal = () => {
    form.resetFields();
    setIsOpenModal(false);
    setBank(null);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (bank) {
        values.id = bank.id;
      }

      submitMutation.mutate(values, {
        onSuccess() {
          Notification(
            'success',
            intl.formatMessage({
              id: `message.${bank ? 'updateSuccess' : 'createSuccess'}`,
            }),
          );
          refetch();
          handleCancelModal();
        },
        onError({ error }) {
          console.log({ error });
        },
      });
    });
  };

  const handleDelete = (id) => {
    deleteBankSettingMutation.mutate(id, {
      onSuccess() {
        Notification(
          'success',
          intl.formatMessage({ id: 'message.deleteSuccess' }),
        );
        refetch();
      },
      onError(error) {
        console.log({ error });
      },
    });
  };

  const handleEdit = (bank) => {
    setIsOpenModal(true);
    form.setFieldsValue(bank);
    setBank(bank);
  };

  return (
    <SettingLayout
      title={intl.formatMessage({ id: 'views.settings.title.paymentTitle' })}
    >
      <StyledButton
        type="dashed"
        size="large"
        block
        icon={<PlusIcon />}
        style={{ height: 72, marginBottom: 42 }}
        onClick={() => setIsOpenModal(true)}
      >
        {intl.formatMessage({ id: 'common.btn.addBankAccount' })}
      </StyledButton>

      <PaymentList
        banks={data}
        onClickDelete={handleDelete}
        onClickEdit={handleEdit}
      />

      <Modal
        open={isOpenModal}
        size="small"
        title={intl.formatMessage({
          id: `common.modal.${bank ? 'editTitle' : 'addNewTitle'}`,
        })}
        onCancel={handleCancelModal}
        onOk={handleSubmit}
        okButtonProps={{ loading: submitMutation.isLoading }}
      >
        <PaymentForm form={form} />
      </Modal>
    </SettingLayout>
  );
};
