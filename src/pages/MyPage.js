import React, { useState } from 'react';
import styled from 'styled-components';
import { Text, Input, Button } from "../elements";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actionCreators as userActions } from '../redux/modules/user';

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 20px;
`;

const MyPage = (Route) => {


  const [nickName, setNickname] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const user = useSelector(state => state.user.user);
  const profile = useSelector((state) => state.user.profile)
  const dispatch = useDispatch()

  const MyPageEditButtonPress = async () => {
    const checkName = (name) => {
      const regex = /^[a-z0-9._]+$/
      return (!!name && regex.test(name));
    }

    if (!(emailAddress && nickName && profile)) {
      window.alert("모든 값을 입력해주세요. (사진 포함)");
    } else if (!(checkName(nickName))) {
      window.alert("아이디는 숫자와 영소문자 특수문자 . _ 만 포함할 수 있습니다.")
    } else {
      await dispatch(userActions.updateUserFB(nickName, profile))
    }
  }

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

  useEffect(() => {
    const { email, displayName, photoURL } = user;
    setEmailAddress(email)
    setNickname(displayName)
    dispatch(userActions.setProfile(photoURL));
  }, [dispatch, user])

  return (
    <React.Fragment>
      <Container>
        <Text size="32px" bold>내 정보</Text>
        <Input isProfile src={profile} _onChange={selectFile} />
        <Input
          label="이메일 (수정불가)"
          value={emailAddress}
          disable
          returnKeyType="next"
        />
        <Input
          label="닉네임 (수정가능)"
          value={nickName}
          _onChange={(e) => setNickname(e.target.value)}
          returnKeyType="next"
        />
        <Button
          _onClick={() => {
            MyPageEditButtonPress()
          }}
          text="정보수정하기"
        />
      </Container>
    </React.Fragment>
  )
}

export default MyPage;