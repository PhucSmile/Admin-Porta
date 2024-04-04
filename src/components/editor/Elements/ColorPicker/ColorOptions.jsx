import styled from 'styled-components';

const StyledColorOptions = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  align-items: center;
  gap: 5px;

  > div {
    width: 16px;
    height: 16px;
    background-color: var(--black);
  }
`;

export const ColorOptions = ({ colors = [], onChangeColor = () => {} }) => {
  return (
    <StyledColorOptions>
      {colors.map((color) => {
        return (
          <div
            key={color}
            onClick={() => onChangeColor(color)}
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </StyledColorOptions>
  );
};
