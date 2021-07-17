import React, { useState } from 'react';
import styled from 'styled-components';

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
  color: ${({isFocused}) => isFocused ? "black" : "gray" };
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
  border: 1px solid ${({isFocused}) => isFocused ? "blue" : "transparent" };
  border-radius: 4px;
`;

const FileLabel = styled.label`
  display: block;
  width: 100%;
  height: 30px;
  background-color:#FFD8B2;
  border-radius: 4px;
  color: white;
  text-align: center;
  line-height: 30px;
`;

const FilePick = styled.input`
  margin: 8px;
  display: none;
`;

const FileInput = (props) => {
  const { label } = props
  return (
    <Container>
      <FileLabel htmlFor="input-file">{ label }</FileLabel>
      <FilePick type="file" id="input-file"/>
    </Container>
  )
}

const Input = ({
  label,
  value,
  _onChange,
  _onSubmit,
  _onClick,
  placeholder,
  isPassword,
  maxLength,
  returnKeyType,
  isFileUpload,
}) => {

  const [isFocused, setIsFocused] = useState(false);

  return isFileUpload ? (
    <FileInput label={label} onClick={_onClick}/>
  ) : (
    <Container>
      <InputLabel htmlFor="input-text" isFocused={isFocused}>
        { label }
      </InputLabel>
      <TextInput
        id="input-text"
        value={value}
        onChange={_onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
        }}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        autoComplete={isPassword ? "current-password" : "false" }
        maxLength={maxLength}
        autoCapitalize="false"
        autoCorrect="false"
        type={isPassword ? "password" : "text"}
        onSubmit={_onSubmit}
        onKeyPress={(key) => key.key === 'Enter' ? _onSubmit() : null}
      />
    </Container>
  )
}

Input.defaultProps = {
  _onChange: () => {},
  placeholder: "insert placeholder",
  isPassword: false,
  maxLength: 64,
  returnKeyType: "done"
}

export default Input;