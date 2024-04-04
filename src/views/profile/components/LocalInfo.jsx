import { Col, Row, Select } from 'antd';
import { useDistrictsByProvinceId, useProvinces } from 'api/locationApi';
import { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import {
  StyledButton,
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledSelect,
} from 'styles/overrides';
import { Form } from 'antd';
import {
  useCreatePublicCustomer,
  useUpdatePublicCustomer,
} from 'api/customerApi';
import {
  normalizeInitialValues,
  normalizeSubmitData,
} from 'views/customers/utils';
import { Notification } from 'components';
import { useNavigate } from 'react-router-dom';

function LocalInfo({ dataUser, search, setOpenProfileUser }) {
  const canEdit = false;
  const intl = useIntl();
  const navigate = useNavigate();
  const [provinceId, setProvinceId] = useState(null);
  const { data: provinces = [], isLoadingProvinces } = useProvinces();
  const { data: districts = [], isLoadingDistricts } = useDistrictsByProvinceId(
    { provinceId },
  );
  const [form2] = Form.useForm();
  const createCustomerMutation = useCreatePublicCustomer();
  const updateCustomerMutation = useUpdatePublicCustomer();

  const newInitialValues = useMemo(
    () => normalizeInitialValues(dataUser),
    [dataUser],
  );
  const mutation = useMemo(
    () => (newInitialValues ? updateCustomerMutation : createCustomerMutation),
    [newInitialValues, updateCustomerMutation, createCustomerMutation],
  );

  useEffect(() => {
    setProvinceId(dataUser?.defaultAddress?.provinceId);
    form2.setFieldsValue({
      defaultAddress: {
        address: dataUser?.defaultAddress?.address,
        provinceId: dataUser?.defaultAddress?.provinceId,
        districtId: dataUser?.defaultAddress?.districtId,
      },
      fullName: dataUser?.fullName,
    });
  }, [form2, dataUser]);

  const handleChangeProvince = (provinceId) => {
    setProvinceId(provinceId);
  };

  const handleSubmit = (value) => {
    var values = {
      fullName: value.fullName,
      phone: search.phone,
      defaultAddress: value.defaultAddress,
    };

    const data = normalizeSubmitData(values);
    if (newInitialValues?.id) {
      data.id = newInitialValues.id;
    }

    mutation.mutate(data, {
      onSuccess: () => {
        Notification(
          'success',
          intl.formatMessage({
            id: `message.${dataUser ? 'updateSuccess' : 'createSuccess'}`,
          }),
        );
        setOpenProfileUser(false);
        navigate('/profile');
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
    <StyledForm
      layout="vertical"
      size="large"
      onFinish={handleSubmit}
      form={form2}
    >
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <StyledFormItem
            name="fullName"
            label={intl.formatMessage({
              id: 'views.profile.userNumberPhone',
            })}
            rules={[{ required: true }]}
          >
            <StyledInput
              placeholder={intl.formatMessage({
                id: 'views.orders.form.placeholder.fullName',
              })}
            />
          </StyledFormItem>
        </Col>
        <Col span={12}>
          <StyledFormItem
            label={intl.formatMessage({
              id: 'views.orders.form.label.provinceId',
            })}
            name={['defaultAddress', 'provinceId']}
            rules={[{ required: true }]}
          >
            <StyledSelect
              placeholder={intl.formatMessage({
                id: 'views.orders.form.placeholder.provinceId',
              })}
              loading={isLoadingProvinces}
              onChange={handleChangeProvince}
              disabled={canEdit}
              // defaultValue={49}
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
            name={['defaultAddress', 'districtId']}
            rules={[{ required: true }]}
          >
            <StyledSelect
              placeholder={intl.formatMessage({
                id: 'views.orders.form.placeholder.districtId',
              })}
              loading={isLoadingDistricts}
              disabled={!provinceId || canEdit}
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
            name={['defaultAddress', 'address']}
            rules={[{ required: true }]}
          >
            <StyledInput
              placeholder={intl.formatMessage({
                id: 'views.orders.form.placeholder.address',
              })}
              disabled={canEdit}
            />
          </StyledFormItem>
        </Col>
      </Row>
      <StyledFormItem style={{ textAlign: 'center' }}>
        <StyledButton type="primary" htmlType="submit">
          {intl.formatMessage({ id: 'common.btn.send' })}
        </StyledButton>
      </StyledFormItem>
    </StyledForm>
  );
}

export default LocalInfo;
