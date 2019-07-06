import styled from "styled-components";

const Spacer = styled.div`
  width: calc(100% - ${props => props.widthPx * 2}px);
  height: calc(100% - ${props => props.widthPx * 2}px);
  margin: ${props => props.widthPx}px;
`;

export default Spacer;
