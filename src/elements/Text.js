import React from 'react';
import styled from 'styled-components';

const P = styled.span`
  text-indent: 2;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold ? "600" : "400"};
  ${(props) => props.right ? 'text-align: end;' : "" }
  word-break: break-all;
  flex: 1;
`;

const Text = (props) => {

  const { bold, color, size, right, children, indent } = props;

  return (
    <React.Fragment>
      <P
        bold={bold}
        color={color}
        right={right}
        size={size}
        indent={indent}
      >
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