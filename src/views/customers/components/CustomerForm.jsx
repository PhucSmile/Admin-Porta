import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Row, Col, Select } from 'antd';

import {
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledSelect,
} from 'styles/overrides';
import { CardWrapper } from 'components/layout';
import { VNMobilePhonePattern } from 'utils/validationUtils';
import { useProvinces, useDistrictsByProvinceId } from 'api/locationApi';

export const CustomerForm = ({ initialValues, ...props }) => {
  const intl = useIntl();
  const [provinceId, setProvinceId] = useState(
    () => initialValues?.defaultAddress?.provinceId,
  );
  const { data: provinces = [], isLoadingProvinces } = useProvinces();
  const { data: districts = [], isLoadingDistricts } = useDistrictsByProvinceId(
    { provinceId },
  );

  useEffect(() => {
    setProvinceId(initialValues?.defaultAddress?.provinceId);
    props.form?.setFieldsValue(initialValues);
  }, [initialValues, props.form]);

  const handleChangeProvince = (provinceId) => {
    setProvinceId(provinceId);

    props?.form?.setFieldsValue({
      districtId: null,
    });
  };

  return (
    <CardWrapper>
      <StyledForm layout="vertical" size="large" {...props}>
        <Row gutter={[32, 0]}>
          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.customers.form.label.fullName',
              })}
              name="fullName"
              rules={[{ required: true }]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.customers.form.placeholder.fullName',
                })}
              />
            </StyledFormItem>
          </Col>

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.customers.form.label.phone',
              })}
              name="phone"
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
                  id: 'views.customers.form.placeholder.phone',
                })}
              />
            </StyledFormItem>
          </Col>

          {/* <Col span={8}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.customers.form.label.email',
              })}
              name="email"
              rules={[
                {
                  type: 'email',
                  message: intl.formatMessage({ id: 'validate.invalidEmail' }),
                },
              ]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.customers.form.placeholder.email',
                })}
              />
            </StyledFormItem>
          </Col> */}

          <Col span={12}>
            <StyledFormItem
              label={intl.formatMessage({
                id: 'views.customers.form.label.provinceId',
              })}
              name={['defaultAddress', 'provinceId']}
              rules={[{ required: true }]}
            >
              <StyledSelect
                placeholder={intl.formatMessage({
                  id: 'views.customers.form.placeholder.provinceId',
                })}
                loading={isLoadingProvinces}
                onChange={handleChangeProvince}
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
                id: 'views.customers.form.label.districtId',
              })}
              name={['defaultAddress', 'districtId']}
              rules={[{ required: true }]}
            >
              <StyledSelect
                placeholder={intl.formatMessage({
                  id: 'views.customers.form.placeholder.districtId',
                })}
                loading={isLoadingDistricts}
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
                id: 'views.customers.form.label.address',
              })}
              name={['defaultAddress', 'address']}
              rules={[{ required: true }]}
            >
              <StyledInput
                placeholder={intl.formatMessage({
                  id: 'views.customers.form.placeholder.address',
                })}
              />
            </StyledFormItem>
          </Col>
        </Row>
      </StyledForm>
    </CardWrapper>
  );
};
