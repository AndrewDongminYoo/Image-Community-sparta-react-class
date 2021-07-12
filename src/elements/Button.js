import React from 'react';
import styled from 'styled-components';

const BtnContainer = styled.div`
  box-sizing: border-box;
  border: none;
  display: block;
  background-color: ${(isFilled) => isFilled ? 'black' : 'transparent'};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 100%;
  padding: 12px 0;
`;

const BtnText = styled.span`
  display: block;
  text-align: center;
  font-size: 12px;
  color:  ${(isFilled) => isFilled ? 'white' : 'black'};
`;

const Button = props => {

  const { containerStyle, _onClick, text, isFilled } = props;

  return (
    <BtnContainer
      isFilled={isFilled}
      onClick={_onClick}
      style={containerStyle}
    >
      <BtnText isFilled={isFilled}>
        { text }
      </BtnText>
    </BtnContainer>
  )
}

Button.defaultProps = {
  _onClick: () => {},
  isFilled: true,
}

export default Button;