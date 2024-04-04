import styled, { css } from 'styled-components';

import { StyledTypographyTitle } from 'styles/overrides';

const StyledContentWrapper = styled.div`
  .titleWrapper {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 550px) {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 10px;
    }

    .ant-typography {
      color: var(--gray900);
      margin-bottom: 0;
    }

    ${(props) => {
      if (props.hasBorder) {
        return css`
          padding-bottom: 5px;
          border-bottom: 3px solid var(--gray200);
        `;
      }
    }}
  }

  ${(props) => {
    if (props.size === 'small') {
      return css`
        .titleWrapper .ant-typography {
          font-size: 16px;
        }
      `;
    }
  }}
`;

export const ContentWrapper = ({
  title,
  hasBorder = false,
  children,
  extraActions,
  ...restProps
}) => {
  return (
    <StyledContentWrapper hasBorder={hasBorder} {...restProps}>
      {title && (
        <div className="titleWrapper">
          <StyledTypographyTitle level={3}>{title}</StyledTypographyTitle>

          {extraActions}
        </div>
      )}

      {children}
    </StyledContentWrapper>
  );
};
