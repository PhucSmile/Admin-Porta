import styled, { css } from 'styled-components';
import {
  Form,
  Input,
  Typography,
  Button,
  Layout,
  Menu,
  Avatar,
  Space,
  Breadcrumb,
  Table,
  Select,
  Collapse,
  Drawer,
  DatePicker,
  Modal,
  InputNumber,
} from 'antd';

import { SIDER_WIDTH, SIDER_COLLAPSED_WIDTH } from 'constants/styles';

export const StyledForm = styled(Form)``;

export const StyledFormItem = styled(Form.Item)`
  /* margin-bottom: 16px; */

  .ant-form-item-label > label {
    height: auto !important;
  }
`;

export const StyledInput = styled(Input)`
  border-radius: 6px;

  ${(props) => {
    if (props.$customType === 'filter') {
      return css`
        width: 180px;
      `;
    }
  }}
`;

export const StyledInputPassword = styled(Input.Password)`
  border-radius: 6px;
`;

export const StyledTypographyTitle = styled(Typography.Title)``;

export const StyledButton = styled(Button)`
  font-weight: 700;
  border-radius: 4px;

  &.ant-btn-primary {
    background: var(--primary);
    border-color: var(--primary);
  }

  ${(props) => {
    if (props.type === 'dark') {
      return css`
        color: var(--white) !important;
        background-color: var(--gray700) !important;
      `;
    }

    if (props.type === 'dashed') {
      return css`
        color: var(--primary);
        border-color: currentColor;
        background-color: var(--gray100);
      `;
    }

    if (props.active === 'true') {
      return css`
        color: var(--primary);
        font-weight: 700;
      `;
    }
  }}
`;

export const StyledLayout = styled(Layout)`
  min-height: 100%;
`;

export const StyledLayoutContentWrapper = styled(Layout)`
  @media (min-width: 992px) {
    margin-left: ${({ collapsed }) =>
      collapsed === 'true' ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH}px;
  }

  background-color: var(--gray200);
`;

export const StyledLayoutHeader = styled(Layout.Header)`
  background-color: var(--white);
  line-height: normal;
  display: flex;
  align-items: center;

  .right-block {
    > * + * {
      position: relative;
      padding-left: 16px;
      margin-left: 16px;

      &::before {
        content: '';
        display: inline-block;
        height: 24px;
        width: 1px;
        background-color: var(--gray200);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      @media (max-width: 767px) {
        padding-left: 8px;
        margin-left: 8px;
      }
    }
  }

  @media (max-width: 991px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (max-width: 575px) {
    position: sticky;
    top: 0;
    background: var(--white);
    z-index: 99;
    box-shadow: 0px 3px 9px -1px rgb(0 0 0 / 80%);
  }
`;

export const StyledLayoutContent = styled(Layout.Content)`
  margin: 24px;
  background-color: var(--white);
  padding: 12px 24px;

  @media (max-width: 767px) {
    margin: 16px;
  }
`;

export const StyledSider = styled(Layout.Sider)`
  @media (min-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
  min-height: 100%;
  overflow: auto;
  flex: 0 0
    ${({ collapsed }) => (collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH)}px !important;
  max-width: ${({ collapsed }) =>
    collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH}px !important;
  min-width: ${({ collapsed }) =>
    collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH}px !important;
  width: ${({ collapsed }) =>
    collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH}px !important;
`;

export const StyledSiderMenu = styled(Menu)`
  .ant-menu-item {
    color: var(--gray400) !important;
    height: 56px !important;
    line-height: 56px !important;

    &:hover {
      color: var(--white) !important;
    }

    &.ant-menu-item-selected {
      color: var(--white) !important;
      background-color: var(--primary) !important;
    }

    .ant-menu-item-icon {
      font-size: 24px;
    }
  }
`;

export const StyledAvatar = styled(Avatar)``;

export const StyledSpace = styled(Space)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-right: 1rem;

  &.chart-wrapper {
    > .ant-space-item {
      width: 100%;
    }
  }

  .ant-form-item {
    margin-bottom: 0 !important;
  }

  @media (max-width: 550px) {
    justify-content: center;
    padding-right: 0;
  }
`;

export const StyledTypographyParagraph = styled(Typography.Paragraph)`
  div&.ant-typography,
  &.ant-typography p {
    margin-bottom: 0;
  }
`;

export const StyledTriggerBtn = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--white);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px rgba(25, 37, 50, 0.1),
    0px 3px 7px -3px rgba(25, 37, 50, 0.1),
    0px 6px 12px -2px rgba(25, 37, 50, 0.1);
  cursor: pointer;

  .anticon {
    font-size: 24px;
  }
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  li {
    color: var(--gray500);

    &:last-child {
      color: var(--gray900);
    }
  }
`;

export const StyledBreadcrumbItem = styled(Breadcrumb.Item)``;

export const StyledSiderUserInfo = styled.div`
  background-color: var(--gray800);
  border-bottom: 1px solid var(--gray700);
  padding: 24px 6px;
`;

export const StyledTable = styled(Table)`
  .ant-table.ant-table-bordered > .ant-table-container,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table,
  .ant-table-thead > tr > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-summary
    > table
    > thead
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-summary
    > table
    > tbody
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-summary
    > table
    > tfoot
    > tr
    > th,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-content
    > table
    > tfoot
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > tfoot
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-body
    > table
    > tfoot
    > tr
    > td,
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-summary
    > table
    > tfoot
    > tr
    > td {
    border-color: var(--gray300);
  }

  .ant-table-thead {
    > tr > th {
      color: var(--gray700);
      background-color: var(--blue200);
      font-size: 16px;
      font-weight: 500;

      &.withColor {
        color: var(--blue400);
      }
    }
  }

  .ant-table-tbody {
    > tr {
      &:nth-child(odd) td {
        background-color: var(--white);
      }

      &:nth-child(even) td {
        background-color: var(--gray100);
      }

      &.ant-table-row-selected td {
        background-color: var(--blue100);
      }

      > td.withColor > * {
        color: var(--blue400);
        font-weight: 600;
      }
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--blue600);
    border-color: var(--blue600);
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: var(--blue600);
  }

  .ant-table-footer {
    background-color: var(--gray300);
  }

  .ant-table-title {
    padding: 8px 0;
    border: none !important;
    color: var(--gray700);
    text-align: right;
  }
`;

export const StyledInputSearch = styled(Input.Search)`
  &.ant-input-search
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 4px 4px 0;
  }

  .ant-input {
    border-radius: 4px;
    border-color: red;
  }

  .ant-input,
  .ant-btn {
    border-color: var(--gray300);
  }

  ${(props) => {
    if (props.$customType === 'filter') {
      return css`
        width: 375px;
      `;
    }
  }}
`;

export const StyledSelect = styled(Select)`
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 4px;
    border-color: var(--gray300);
  }

  .ant-select-selection-placeholder {
    color: var(--gray500);
  }

  ${(props) => {
    if (props.$customType === 'filter') {
      return css`
        width: 180px !important;
      `;
    }
  }}
`;

export const StyledActions = styled(Space)`
  display: flex;
  justify-content: flex-end;
  margin: 24px 0;
  flex-wrap: wrap;
`;

export const StyledCollapse = styled(Collapse)`
  background-color: var(--gray200);
`;

export const StyledCollapsePanel = styled(Collapse.Panel)`
  &.noPadding {
    .ant-collapse-content > .ant-collapse-content-box {
      padding: 16px 0;
    }
  }
`;

export const StyledTitleSetting = styled.div`
  padding: 16px 0 16px 10px;
  background: var(--blue200);
  margin-bottom: 17px;
`;

export const StyledTypographyText = styled(Typography.Text)``;

export const StyledTypographyLink = styled(Typography.Link)`
  font-size: 16px;
  font-weight: 700;
  color: va(--primary);
`;

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    padding: 24px;
  }

  .ant-drawer-header {
    border-bottom: 3px solid var(--gray300);
    padding: 0 0 16px;
  }

  .ant-drawer-header-title {
    flex-direction: row-reverse;
  }

  .ant-drawer-close {
    margin-right: 0;
  }

  .ant-drawer-body {
    padding: 24px 0 0 0;
  }

  .ant-drawer-close {
    color: var(--gray700);
  }
`;

export const StyledFormList = styled(Form.List)``;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  border-radius: 4px;
  border-color: var(--gray300);

  .ant-picker-suffix {
    margin-left: 11px;
  }

  .ant-picker-input > input {
    border-right: 1px solid var(--gray300);
    color: var(--gray900);
  }

  .anticon {
    color: var(--gray900);
  }

  ${(props) => {
    if (props.$customType === 'filter') {
      return css`
        .ant-picker-input > input {
          border-right: none;
          width: 233px;
        }

        .anticon {
          color: var(--gray700);
        }
      `;
    }
  }}
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 24px;
  }

  .ant-modal-header {
    padding: 0 0 16px;
    border-bottom: 3px solid var(--gray300);
  }

  .ant-modal-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--gray900);
  }

  .ant-modal-close {
    right: 24px;
    top: 24px;
  }

  .ant-modal-close-x {
    width: auto;
    height: auto;
    line-height: 1;
    color: var(--gray700);
  }

  .ant-modal-body {
    padding: 24px 0;
  }

  .ant-modal-footer {
    border-top: 0;
    padding: 0;

    .ant-btn + .ant-btn:not(.ant-dropdown-trigger) {
      margin-left: 24px;
    }
  }
`;

export const StyledImgOption = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 10px;
  object-fit: contain;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  border-radius: 4px;
  border-color: var(--gray300);
`;

export const StyledLayoutFooter = styled(Layout.Footer)`
  text-align: center;
  padding: 12px 24px;
  color: var(--redText);
  background: rgba(255, 255, 255, 0.15) !important;
`;

export const StyledInputTextArea = styled(Input.TextArea)`
  border-radius: 6px;
`;
