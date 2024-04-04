import { Spin } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = () => {
  return (
    <StyledLoading>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
    </StyledLoading>
  );
};
