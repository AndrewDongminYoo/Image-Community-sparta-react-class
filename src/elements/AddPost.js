import React from 'react';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { history } from '../redux/configureStore';

const BtnContainer = styled.div`
  box-sizing: border-box;
  border: none;
  display: block;
  position: fixed;
  right: 16px;
  bottom: 32px;
  background-color: #FFD600;
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
    <BtnContainer onClick={()=>{
      history.push('/write')}}
    >
        <PlusCircleOutlined style={IconStyle} />
    </BtnContainer>
  )
}


export default AddPost;