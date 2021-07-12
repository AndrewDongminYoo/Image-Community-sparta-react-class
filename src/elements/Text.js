import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold ? "600" : "400"};
`;

const Text = (props) => {

  const { bold, color, size, children } = props;

  return (
    <React.Fragment>
      <P bold={bold} color={color} size={size} >
        { children }
      </P>
    </React.Fragment>
  )
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '14px',
}

export default Text;