import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Input, Button } from "../elements";

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

const Signup = (Route) => {

  const [ID, setID] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(Route)

  return (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>회원가입</Text>
        <Input
          label="아이디"
          value={ID}
          _onChange={setID}
          placeholder="아이디를 입력하세요."
          returnKeyType="next"
        />
        <Input
          label="닉네임"
          value={nickname}
          _onChange={setNickname}
          placeholder="닉네임을 입력하세요."
          returnKeyType="next"
        />
        <Input
          label="비밀번호"
          value={password}
          _onChange={setPassword}
          placeholder="비밀번호를 입력하세요."
          returnKeyType="next"
          isPassword
        />
        <Input
          label="비밀번호 확인"
          value={rePassword}
          _onChange={setRePassword}
          placeholder="비밀번호를 다시 입력하세요."
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{ errorMessage }</ErrorText>
        <Button
          _onClick={() => {
            console.log("회원가입!")
            setErrorMessage("")
          }}
          text="회원가입하기"
        />
      </Container>
    </React.Fragment>
  )
}

export default Signup;