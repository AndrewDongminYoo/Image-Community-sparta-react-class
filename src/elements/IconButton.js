import React from 'react';
import styled from 'styled-components';
import Icon from '@ant-design/icons';

const BtnContainer = styled.div`
  margin-left: 2px;
  margin-right: 2px;
  box-sizing: border-box;
  display: inline-block;
  align-items: center;
  justify-content: center;
  ${(props) => props.size ? `font-size: ${props?.size}px;` : ""}
`;

const IconButton = (props) => {

  const { _onClick, isFilled, Filled, Outlined, IconStyle, containerStyle, size } = props

  return (
    <React.Fragment>
      <BtnContainer size={size} style={containerStyle}>
        <Icon onClick={_onClick} component={isFilled ? Filled : Outlined} style={IconStyle} />
      </BtnContainer>
    </React.Fragment>
  )
}

IconButton.defaultProps = {
  _onClick: () => { },
  isFilled: false,
  containerStyle: {},
  IconStyle: {
    verticalAlign: "text-bottom",
  },
}
export default IconButton;