import { StyledSpace, StyledTypographyParagraph } from 'styles/overrides';
import { InfoIcon } from 'assets/icons';

export const CollapseHeader = ({ title }) => {
  return (
    <StyledSpace size={10}>
      <InfoIcon style={{ fontSize: 24, color: 'var(--gray600)' }} />
      <StyledTypographyParagraph
        style={{ fontWeight: 600, color: 'var(--gray800)' }}
      >
        {title}
      </StyledTypographyParagraph>
    </StyledSpace>
  );
};
