import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Input, Button } from "../elements";
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user'
import { Helmet } from "react-helmet";

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
  font-size: 12px;
  font-weight: 700;
  color: red;
`;

const Login = (Route) => {

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleLoginPress = () => {
    const checkEmail = (email) => {
      const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return (!!email && regex.test(email));
    }
    if (!(Email && password)) {
      setErrorMessage("모두 입력해주세요.")
    } else if (!(checkEmail(Email))) {
      setErrorMessage("이메일을 확인해주세요.")
    } else {
      dispatch(userActions.loginFB(Email, password))
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>꼬리스타그램 로그인</title>
        <meta property="og:title" content="꼬리스타그램 로그인" />
        <meta property="og:description" content="댕냥스타그램은 얼마든지 가입 환영입니다:D" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2FTD74SJjIRSbNh4jKLQ3vmOljWuj2%2F1627447658522?alt=media" />
      </Helmet>
      <Container>
        <Text size="32px" bold>로그인</Text>
        <Input
          id="email-input"
          label="이메일"
          value={Email}
          _onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요."
          returnKeyType="next"
        />
        <Input
          id="password-input"
          label="비밀번호"
          value={password}
          _onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          returnKeyType="done"
          isPassword
          _onSubmit={() => {
            handleLoginPress()
          }}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          _onClick={() => {
            handleLoginPress()
          }}
          text="로그인하기"
        />
      </Container>
    </React.Fragment>
  )
}

export default Login;