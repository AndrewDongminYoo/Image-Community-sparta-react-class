import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Input, Button } from "../elements";
import { useDispatch } from 'react-redux';
import { actionCreators as userActions }  from '../redux/modules/user'

const Container = styled.form`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 20px;
`;

const ErrorText = styled.p`
  align-items: flex-start;
  width: 100%;
  height: 10px;
  line-height: 10px;
  margin-bottom: 10px;
  color: red;
`;

const Login = (Route) => {

  const [password, setPassword] = useState("");
  const [ID, setID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleIDChange = e => {
    const data = e.target.value;
    setID(data);
  }

  const handlePasswordChange = e => {
    const data = e.target.value;
    setPassword(data);
  }

  const handleLoginPress = () => {
    dispatch(userActions.loginAction({user_name: 'ydm2790'}))
  }

  return (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>로그인</Text>
        <Input
          label="아이디"
          value={ID}
          _onChange={(change) => handleIDChange(change)}
          placeholder="아이디를 입력하세요."
          returnKeyType="next"
        />
        <Input
          label="비밀번호"
          value={password}
          _onChange={(change) => handlePasswordChange(change)}
          placeholder="비밀번호를 입력하세요."
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{ errorMessage }</ErrorText>
        <Button
          _onClick={({ ID }) => {
            handleLoginPress({ID})}}
          text="로그인하기"
        />
      </Container>
    </React.Fragment>
  )
}

export default Login;