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

const Signup = (Route) => {

  const [email, setEmail] = useState("");
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const dispatch = useDispatch()

  const handleSignupPress = () => {
    if (password !== rePassword) {
      return;
    }
    if (email && password && rePassword && nickName) {
      dispatch(userActions.signupFB(email, password, nickName))
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>회원가입</Text>
        <Input
          label="이메일"
          value={email}
          _onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요."
          returnKeyType="next"
        />
        <Input
          label="닉네임"
          value={nickName}
          _onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요."
          returnKeyType="next"
        />
        <Input
          label="비밀번호"
          value={password}
          _onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요."
          returnKeyType="next"
          isPassword
        />
        <Input
          label="비밀번호 확인"
          value={rePassword}
          _onChange={(e) => setRePassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요."
          returnKeyType="done"
          isPassword
        />
        <Button
          _onClick={(email, password, rePassword, nickName) => {
            console.log("회원가입!")
            handleSignupPress({email, password, rePassword, nickName})
          }}
          text="회원가입하기"
        />
      </Container>
    </React.Fragment>
  )
}

export default Signup;