import styled from "styled-components";

const Block = styled.div`
  width: 100%;
  height: 100%;
  border: ${props => props.theme.gapWidthPx}px solid
    ${props => props.theme.gapColor};
`;

export default Block;
