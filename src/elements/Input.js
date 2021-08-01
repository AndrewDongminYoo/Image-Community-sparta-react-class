import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Input = ({ id, numberOfLines, label, value, _onChange, _onSubmit, placeholder, isPassword, maxLength, returnKeyType, isFileUpload, disable, isProfile, src, size }) => {

  const [isFocused, setIsFocused] = useState(false);
  const fileRef = useRef();
  const is_uploading = useSelector((state) => state.image.is_uploading)

  // file-input
  if (isProfile) {
    return (
      <React.Fragment>
        <ImageLabel src={src} size={100} accept="image/*" htmlFor="file-input" disabled={is_uploading || disable} />
        <FilePick ref={fileRef} onChange={_onChange} type="file" id="file-input" disabled={is_uploading || disable} />
      </React.Fragment>
    )
  } if (isFileUpload) {
    return (
      <Container>
        <FileLabel accept="image/*" htmlFor="file-input" disabled={is_uploading || disable}>{label}</FileLabel>
        <FilePick ref={fileRef} onChange={_onChange} type="file" id="file-input" disabled={is_uploading || disable} />
      </Container>
    ) // textarea
  } else if (numberOfLines) {
    return (
      <Container>
        <InputLabel>
          {label}
        </InputLabel>
        <TextAreaInput
          value={value}
          spellCheck
          rows={numberOfLines}
          required
          placeholder={placeholder}
          onChange={_onChange}
        />
      </Container>
    ) // input(text, password, email)
  } else {
    return (
      <Container>
        <InputLabel htmlFor={id} isFocused={isFocused}>
          {label}
        </InputLabel>
        <TextInput
          id={id}
          value={value}
          onChange={_onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
          }}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          autoComplete={isPassword ? "current-password" : "false"}
          maxLength={maxLength}
          autoCapitalize="false"
          autoCorrect="false"
          type={isPassword ? "password" : "text"}
          onSubmit={_onSubmit}
          onKeyPress={(key) =>
            key.key === 'Enter'
              ? _onSubmit()
              : null}
        />
      </Container>
    )
  }
}

Input.defaultProps = {
  _onChange: () => { },
  _onSubmit: () => { },
  placeholder: "insert placeholder",
  isPassword: false,
  maxLength: 64,
  returnKeyType: "done"
}

const Container = styled.div`
  flex-direction: column;
  width: 100%;
  margin: 10px 0px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ isFocused }) => isFocused ? "black" : "gray"};
`;

const TextInput = styled.input`
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #000;
  padding: 6px 30px 6px 10px;
  font-size: 14px;
  border: 1px solid ${({ isFocused }) => isFocused ? "blue" : "transparent"};
  border-radius: 4px;
`;

const TextAreaInput = styled.textarea`
  box-sizing: border-box;
  background-color: #fefefe;
  width: 100%;
  color: #000;
  padding: 12px 30px 12px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
`;

const FileLabel = styled.label`
  display: block;
  width: 100%;
  height: 30px;
  opacity: 0.6;
  background: linear-gradient(to right, #16222A 0%, #3A6073 51%, #16222A 100%);
  border-radius: 4px;
  color: white;
  text-align: center;
  line-height: 30px;
`;

const ImageLabel = styled.label`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 20px auto;
  display: block;
`;

const FilePick = styled.input`
  margin: 8px;
  display: none;
`;

export default Input;