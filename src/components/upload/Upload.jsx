import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Form, Upload as AtndUpload, Alert, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { useResetFormOnCloseModal } from 'hooks/useResetFormOnCloseModal';
import { Modal } from 'components/modal';
import { StyledForm, StyledFormItem, StyledButton } from 'styles/overrides';
import { UploadIcon } from 'assets/icons';
import { Notification } from 'components/Notification';

export const Upload = ({ mutation, onSuccess = () => {} }) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);

  useResetFormOnCloseModal({
    form,
    open: isOpen,
  });

  const handleBeforeUpload = (file) => {
    const isCSV = file.type === 'text/csv';

    if (!isCSV) {
      message.error(intl.formatMessage({ id: 'validate.invalidFile' }));
    }

    return isCSV ? false : AtndUpload.LIST_IGNORE;
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (!mutation) {
        return;
      }

      const formData = new FormData();
      formData.append('file', values?.file?.file);

      mutation.mutate(formData, {
        onSuccess() {
          handleCancel();
          Notification(
            'success',
            intl.formatMessage({ id: 'message.uploadSuccess' }),
          );
          onSuccess();
        },
        onError(error) {
          console.log({ error });
          Notification(
            'error',
            intl.formatMessage({ id: 'message.commonError' }),
          );
        },
      });
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <StyledButton
        icon={<UploadIcon />}
        size="large"
        onClick={() => setIsOpen(true)}
      >
        {intl.formatMessage({ id: 'common.btn.importCsv' })}
      </StyledButton>

      <Modal
        onOk={handleSubmit}
        title={intl.formatMessage({ id: 'components.import.modalTitle' })}
        open={isOpen}
        onCancel={handleCancel}
        okButtonProps={{ loading: mutation?.isLoading }}
      >
        <StyledForm form={form}>
          <StyledFormItem
            name="file"
            valuePropName="file"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'validate.required' }),
              },
            ]}
          >
            <AtndUpload.Dragger
              accept="text/csv"
              multiple={false}
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {intl.formatMessage({ id: 'components.import.desc' })}
              </p>
            </AtndUpload.Dragger>
          </StyledFormItem>

          <StyledFormItem
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.file !== currentValues.file
            }
          >
            {({ getFieldValue }) => {
              const fileName = getFieldValue('file')?.file?.name;

              return fileName ? (
                <Alert message={fileName} type="success" />
              ) : null;
            }}
          </StyledFormItem>
        </StyledForm>
      </Modal>
    </>
  );
};
