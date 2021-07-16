import React from 'react';
import styled from 'styled-components';

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  flex-direction: ${(props) => !props.row ? "column" : "row"}${(props) => props.reverse ? "-reverse" : ""};
  ${(props) => props.padding ? `padding: ${props.padding};` : ""}
  ${(props) => props.paddingVertical ? `padding-top: ${props.paddingVertical}; padding-bottom: ${props.paddingVertical};` : ""}
  ${(props) => props.paddingHorizontal ? `padding-left: ${props.paddingHorizontal}; padding-right: ${props.paddingHorizontal};` : ""}
  ${(props) => props.margin ? `margin: ${props.margin};` : ""}
  ${(props) => props.bcg ? `background-color: ${props.bcg};` : ""}
  ${(props) => props.is_flex ? `display: flex; align-items: center;` : ""}
  justify-content: center;
`;

const Grid = (props) => {

  const {  is_flex, width, row, padding, reverse, paddingHorizontal, paddingVertical, margin, bcg, children } = props

  return (
    <React.Fragment>
      <GridBox
        is_flex={is_flex}
        width={width}
        reverse={reverse}
        row={row}
        padding={padding}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        margin={margin}
        bcg={bcg}
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
  bcg: false,
}

export default Grid;