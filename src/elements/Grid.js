import React from 'react';
import styled from 'styled-components';

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  vertical-align: middle;
  flex-direction: ${(props) => !props.row ? "column" : "row"}${(props) => props.reverse ? "-reverse" : ""};
  ${(props) => props.padding ? `padding: ${props.padding};` : ""}
  ${(props) => props.margin ? `margin: ${props.margin};` : ""}
  ${(props) => props.backgroundColor ? `background-color: ${props.backgroundColor};` : ""}
  ${(props) => props.is_flex ? `display: flex; align-items: center;` : ""}
  justify-content: ${(props) => props.justify === 'flex-end' ? 'flex-end' : 'center'};
  ${(props) => props.center ? `text-align: center;` : ""}
  position: ${(props) => props.position};
`;

const Grid = (props) => {

  const { _onClick, is_flex, justify, position, width, row, padding, reverse, margin, backgroundColor, children, center } = props

  return (
    <React.Fragment>
      <GridBox
        onClick={_onClick}
        justify={justify}
        is_flex={is_flex}
        width={width}
        reverse={reverse}
        row={row}
        padding={padding}
        margin={margin}
        backgroundColor={backgroundColor}
        center={center}
        position={position}
      >
        {children}
      </GridBox>
    </React.Fragment>
  )

}

Grid.defaultProps = {
  position: "static",
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  backgroundColor: false,
}

export default Grid;