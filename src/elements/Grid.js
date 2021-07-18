import React from 'react';
import styled from 'styled-components';

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  flex-direction: ${(props) => !props.row ? "column" : "row"}${(props) => props.reverse ? "-reverse" : ""};
  ${(props) => props.padding ? `padding: ${props.padding};` : ""}
  ${(props) => props.margin ? `margin: ${props.margin};` : ""}
  ${(props) => props.backgroundColor ? `background-color: ${props.backgroundColor};` : ""}
  ${(props) => props.is_flex ? `display: flex; align-items: center;` : ""}
  justify-content: center;
  ${(props) => props.center ? `text-align: center;` : ""}
`;

const Grid = (props) => {

  const {  is_flex, width, row, padding, reverse, margin, backgroundColor, children, center } = props

  return (
    <React.Fragment>
      <GridBox
        is_flex={is_flex}
        width={width}
        reverse={reverse}
        row={row}
        padding={padding}
        margin={margin}
        backgroundColor={backgroundColor}
        center={center}
      >
        { children }
      </GridBox>
    </React.Fragment>
  )

}

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  backgroundColor: false,
}

export default Grid;