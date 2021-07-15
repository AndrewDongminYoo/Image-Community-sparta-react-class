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
  color: #000;
  padding: 12px 30px 12px 10px;
  font-size: 14px;
  border: 1px solid ${({isFocused}) => isFocused ? "blue" : "gray" };
  border-radius: 4px;
`;

const Input = ({
  label,
  value,
  _onChange,
  _onSubmit,
  placeholder,
  isPassword,
  maxLength,
  returnKeyType,
}) => {

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container>
      <InputLabel isFocused={isFocused}>
        { label }
      </InputLabel>
      <TextInput
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