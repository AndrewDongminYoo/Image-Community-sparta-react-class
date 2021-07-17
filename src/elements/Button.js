import React from 'react';
import styled from 'styled-components';

const BtnContainer = styled.div`
  box-sizing: border-box;
  border: none;
  display: block;
  background-color: ${(props) => props.isFilled ? 'black' : 'transparent'};
  border: ${(props) => props.isFilled ? 'none': '1px solid black' };
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 100%;
  padding: 12px 0;
`;

const BtnText = styled.span`
  display: block;
  text-align: center;
  font-size: 12px;
  color: ${(props) => props.isFilled ? 'white' : 'black'};
`;

const Button = props => {

  const { containerStyle, _onClick, isFilled, text, children } = props;

  return (
    <BtnContainer
      isFilled={isFilled}
      onClick={_onClick}
      style={containerStyle}
    >
      <BtnText isFilled={isFilled}>
        { text || children }
      </BtnText>
    </BtnContainer>
  )
}

Button.defaultProps = {
  _onClick: () => {},
  isFilled: true,
}

export default Button;