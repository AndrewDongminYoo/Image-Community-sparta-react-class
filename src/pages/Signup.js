import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Input, Button } from "../elements";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user'


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

const Signup = (Route) => {

  const [email, setEmail] = useState("");
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const profile = useSelector((state) => state.user?.profile);

  const dispatch = useDispatch()

  const handleSignupPress = () => {

    const checkEmail = (email) => {
      const regex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return (!!email && regex.test(email));
    }

    if (!(email && password && rePassword && nickName && profile)) {
      setErrorMessage("모든 값을 입력해주세요.");
    } else if (password.length < 8 && password.length > 14) {
      setErrorMessage("비밀번호는 8자 이상 14자 이하여야 합니다.")
    } else if (!(checkEmail(email))) {
      setErrorMessage("이메일 형식이 올바르지 않습니다.")
    } else if (email.length < 12 && email.length > 32) {
      setErrorMessage("이메일 길이를 확인해주세요.")
    } else if (password !== rePassword) {
      setErrorMessage("비밀번호 체크를 확인해주세요.")
    } else {
      dispatch(userActions.signupFB(email, password, nickName, profile))
    }
  }

  // 서버 업로드 없이 사진 미리보기를 세팅하는 onChange 함수!
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) { console.log('File Open Error'); return; }
    else if (!file.type.startsWith('image/')) { window.alert('이미지 파일만 업로드할 수 있어요ㅠ'); return; }
    else if (file.size > 52428800) { window.alert('파일이 너무 크네요ㅠㅠ'); return; }
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(userActions.setProfile(reader.result));
    };
  }

  return (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>회원가입</Text>
        <Input isProfile src={profile} _onChange={(e) => selectFile(e)} />
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
          _onSubmit={() => {
            handleSignupPress()
          }}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          _onClick={() => {
            handleSignupPress()
          }}
          text="회원가입하기"
        />
      </Container>
    </React.Fragment>
  )
}

export default Signup;