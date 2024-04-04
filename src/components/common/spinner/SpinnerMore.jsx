import styled from 'styled-components';
import { Spin } from 'antd';

const SpinnerMoreContainer = styled.div`
  text-align: center;
  margin-top: 12px;

  &.center {
    margin-top: auto;
    margin-bottom: auto;
  }

  .ant-spin-dot-item {
    background-color: var(--primary);
  }
`;

export default function SpinnerMore({ className, ...props }) {
  return (
    <SpinnerMoreContainer className={className}>
      <Spin {...props} />
    </SpinnerMoreContainer>
  );
}
