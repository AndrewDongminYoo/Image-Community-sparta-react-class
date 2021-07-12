import React from 'react';
import styled from 'styled-components';

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => props.padding ? `padding: ${props.padding};` : ""}
  ${(props) => props.margin ? `margin: ${props.margin};` : ""}
  ${(props) => props.bcg ? `background-color: ${props.bcg};` : ""}
  ${(props) =>
    props.is_flex
     ? `display: flex;
    align-items: center;`
     : ""}
`;

const Grid = (props) => {

  const { is_flex, width, padding, margin, bcg, children } = props

  return (
    <React.Fragment>
      <GridBox
        is_flex={is_flex}
        width={width}
        padding={padding}
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