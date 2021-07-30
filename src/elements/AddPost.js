import React from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { history } from '../redux/configureStore';

const BtnContainer = styled.div`
  box-sizing: border-box;
  border: none;
  display: block;
  position: fixed;
  right: 16px;
  bottom: 32px;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
  text-align: center;
  border-radius: 24px;
  width: 48px;
  height: 48px;
  line-height: 55px;
`;

const AddPost = (props) => {

  const IconStyle = {
    fontSize: 26,
    fontWeight: 900,
    alignSelf: "center",
    color: "white",
  }

  return (
    <BtnContainer onClick={() => {
      history.push('/write')
    }}
    >
      <EditOutlined style={IconStyle} />
    </BtnContainer>
  )
}


export default AddPost;