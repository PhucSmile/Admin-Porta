import { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Row, Col, Form, Select } from 'antd';
import _ from 'lodash';

import {
  StyledSpace,
  StyledForm,
  StyledFormItem,
  StyledSelect,
  StyledInput,
  StyledCollapse,
  StyledCollapsePanel,
  StyledButton,
} from 'styles/overrides';
import { CollapseHeader } from 'components/collapse';
import { PlusIcon } from 'assets/icons';
import { DatePicker } from 'components/DatePicker';
import { ProductForm } from './ProductForm';
import { SelectProductModal } from './SelectProductModal';
import { Notification } from 'components/Notification';
import { useProvinces, useDistrictsByProvinceId } from 'api/locationApi';
import { VNMobilePhonePattern } from 'utils/validationUtils';
import { OrderStatusSelector } from 'components/selector';
import { useCreateOrder, useUpdateOrder } from 'api/orderApi';
import { normalizeSubmitData } from '../utils';
import { useSendSMS } from 'api/smsApi';
import { PATH_NAME } from 'constants/routes';

export const OrderForm = ({
  id,
  form,
  isOpen,
  initialValues,
  canEdit = false,
  onCancel = () => {},
  onSuccess = () => {},
}) => {
  const intl = useIntl();
  const [provinceId, setProvinceId] = useState(
    () => initialValues?.orderAddress?.provinceId,
  );
  const [isOpenProductModal, setIsOpenProductModal] = useState(false);
  const [fieldProductIndex, setFieldProductIndex] = useState(null);
  const { data: provinces = [], isLoadingProvinces } = useProvinces();
  const { data: districts = [], isLoadingDistricts } = useDistrictsByProvinceId(
    { provinceId },
  );

  const createOrderMutation = useCreateOrder();
  const updateOrderStatusMutation = useUpdateOrder(id);
  const sendSMSMutation = useSendSMS();

  const mutation = useMemo(() => {
    return canEdit ? updateOrderStatusMutation : createOrderMutation;
  }, [canEdit, updateOrderStatusMutation, createOrderMutation]);

  // useEffect(() => {
  //   if (!isOpen) {
  //     setProvinceId(null);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleCancel = () => {
    onCancel();
  };

  const handleOpenProductModal = (fieldIndex) => {
    setFieldProductIndex(fieldIndex);
    setIsOpenProductModal(true);
  };

  const handleChangeProvince = (provinceId) => {
    setProvinceId(provinceId);
    form.setFields([{ name: ['orderAddress', 'districtId'], value: null }]);
  };

  const handleSubmit = (values) => {
    const isPhoneChanged = !_.isEqual(
      _.get(values, 'orderAddress.phone'),
      _.get(initialValues, 'orderAddress.phone'),
    );

    const normalizeData = normalizeSubmitData(
      { ...values, isPhoneChanged },
      canEdit,
    );

    mutation.mutate(normalizeData, {
      onSuccess(res) {
        if (!canEdit) {
          sendSMSMutation.mutate(
            {
              order_id: res.id,
              phone: res.orderAddress.phone,
              message: intl.formatMessage(
                {
                  id: 'components.sendSMS.form.initialValues.message',
                },
                {
                  code: res.code,
                  publicLink: `${window.location.origin}${PATH_NAME.CUSTOMER_ORDER}?code=${res.code}`,
                },
              ),
            },
            {
              onSuccess() {},
              onError() {},
            },
          );
        }

        Notification(
          'success',
          intl.formatMessage({
            id: `message.${canEdit ? 'updateSuccess' : 'createSuccess'}`,
          }),
        );
        handleCancel();
        onSuccess();
      },
      onError() {
        Notification(
          'error',
          intl.formatMessage({ id: 'message.commonError' }),
        );
      },
    });
  };

  return (
    <>
      <StyledForm
        layout="vertical"
        size="large"
        onFinish={handleSubmit}
        form={form}
        initialValues={initialValues}
      >
        <Row>
          <Col span={12} style={{ marginBottom: 8 }}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.orders.form.label.status',
              })}
              name="status"
              rules={[{ required: true }]}
            >
              <OrderStatusSelector
                placeholder={intl.formatMessage({
                  id: 'views.orders.form.placeholder.status',
                })}
              />
            </StyledFormItem>
          </Col>

          <Col span={24}>
            <StyledCollapse
              expandIconPosition="end"
              defaultActiveKey={['1', '2']}
            >
              <StyledCollapsePanel
                header={
                  <CollapseHeader
                    title={intl.formatMessage({
                      id: 'views.products.title.orderInfo',
                    })}
                  />
                }
                key="1"
              >
                <Row gutter={[32, 0]}>
                  <Col span={12}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.livestreamDate',
                      })}
                      name="livestreamDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker disabled={canEdit} />
                    </StyledFormItem>
                  </Col>

                  <Col span={12}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.fullName',
                      })}
                      name={['orderAddress', 'fullName']}
                      rules={[{ required: true }]}
                    >
                      <StyledInput
                        placeholder={intl.formatMessage({
                          id: 'views.orders.form.placeholder.fullName',
                        })}
                        // disabled={canEdit}
                      />
                    </StyledFormItem>
                  </Col>

                  <Col span={12}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.email',
                      })}
                      name={['orderAddress', 'email']}
                      rules={[
                        {
                          type: 'email',
                          message: intl.formatMessage({
                            id: 'validate.invalidEmail',
                          }),
                        },
                      ]}
                    >
                      <StyledInput
                        placeholder={intl.formatMessage({
                          id: 'views.orders.form.placeholder.email',
                        })}
                        // disabled={canEdit}
                      />
                    </StyledFormItem>
                  </Col>

                  <Col span={12}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.phone',
                      })}
                      name={['orderAddress', 'phone']}
                      rules={[
                        { required: true },
                        {
                          pattern: VNMobilePhonePattern,
                          message: intl.formatMessage({
                            id: 'validate.invalidPhoneNumber',
                          }),
                        },
                      ]}
                    >
                      <StyledInput
                        placeholder={intl.formatMessage({
                          id: 'views.orders.form.placeholder.phone',
                        })}
                        // disabled={canEdit}
                      />
                    </StyledFormItem>
                  </Col>

                  <Col span={12}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.provinceId',
                      })}
                      name={['orderAddress', 'provinceId']}
                      rules={[{ required: true }]}
                    >
                      <StyledSelect
                        placeholder={intl.formatMessage({
                          id: 'views.orders.form.placeholder.provinceId',
                        })}
                        loading={isLoadingProvinces}
                        onChange={handleChangeProvince}
                        // disabled={canEdit}
                      >
                        {provinces.length > 0 &&
                          provinces.map(({ id, name }) => (
                            <Select.Option key={id} value={id}>
                              {name}
                            </Select.Option>
                          ))}
                      </StyledSelect>
                    </StyledFormItem>
                  </Col>

                  <Col span={12}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.districtId',
                      })}
                      name={['orderAddress', 'districtId']}
                      rules={[{ required: true }]}
                    >
                      <StyledSelect
                        placeholder={intl.formatMessage({
                          id: 'views.orders.form.placeholder.districtId',
                        })}
                        loading={isLoadingDistricts}
                        // disabled={!provinceId || canEdit}
                        disabled={!provinceId}
                      >
                        {districts.length > 0 &&
                          districts.map(({ id, name }) => (
                            <Select.Option key={id} value={id}>
                              {name}
                            </Select.Option>
                          ))}
                      </StyledSelect>
                    </StyledFormItem>
                  </Col>

                  <Col span={24}>
                    <StyledFormItem
                      label={intl.formatMessage({
                        id: 'views.orders.form.label.address',
                      })}
                      name={['orderAddress', 'address']}
                      rules={[{ required: true }]}
                    >
                      <StyledInput
                        placeholder={intl.formatMessage({
                          id: 'views.orders.form.placeholder.address',
                        })}
                        // disabled={canEdit}
                      />
                    </StyledFormItem>
                  </Col>
                </Row>
              </StyledCollapsePanel>

              <StyledCollapsePanel
                header={
                  <CollapseHeader
                    title={intl.formatMessage({
                      id: 'views.products.title.orderDetails',
                    })}
                  />
                }
                className="noPadding"
                key="2"
              >
                <Form.List
                  name="items"
                  rules={[
                    {
                      validator: async (_, items) => {
                        if (items.length <= 0) {
                          return Promise.reject(
                            new Error(
                              intl.formatMessage({ id: 'validate.required' }),
                            ),
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, ...restField }) => (
                        <ProductForm
                          key={key}
                          {...restField}
                          onRemove={remove}
                          onSearchProduct={handleOpenProductModal}
                          disabled={canEdit}
                        />
                      ))}

                      <Form.Item style={{ padding: '0 16px', marginBottom: 0 }}>
                        <StyledButton
                          type="dashed"
                          block
                          icon={<PlusIcon />}
                          onClick={() => add()}
                          // disabled={canEdit}
                        >
                          {intl.formatMessage({ id: 'common.btn.addProduct' })}
                        </StyledButton>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </StyledCollapsePanel>
            </StyledCollapse>
          </Col>

          <Col span={24} style={{ marginTop: 24 }}>
            <StyledFormItem
              label={intl.formatMessage({ id: 'views.orders.form.label.note' })}
              name="note"
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.orders.form.placeholder.note',
                })}
                disabled={canEdit}
              />
            </StyledFormItem>
          </Col>
        </Row>

        <StyledSpace
          size={24}
          style={{ justifyContent: 'flex-end', marginTop: 8 }}
        >
          <StyledButton
            type="primary"
            htmlType="submit"
            loading={mutation.isLoading || sendSMSMutation.isLoading}
          >
            {intl.formatMessage({ id: 'common.btn.save' })}
          </StyledButton>
          <StyledButton onClick={handleCancel}>
            {intl.formatMessage({ id: 'common.btn.cancel' })}
          </StyledButton>
        </StyledSpace>
      </StyledForm>

      {isOpenProductModal && (
        <SelectProductModal
          onCancel={() => setIsOpenProductModal(false)}
          onApply={(value) => {
            form.setFieldsValue({
              items: form.getFieldValue('items').map((item, index) => {
                return index === fieldProductIndex
                  ? { ...item, ...value }
                  : item;
              }),
            });

            setIsOpenProductModal(false);
            setFieldProductIndex(null);
          }}
        />
      )}
    </>
  );
};
