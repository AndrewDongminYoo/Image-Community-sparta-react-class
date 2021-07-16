import React from 'react';
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

const TextInput = styled.textarea`
  box-sizing: border-box;
  background-color: #fefefe;
  width: 100%;
  color: #000;
  padding: 12px 30px 12px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
`;

const TextArea = ({
  label,
  placeholder,
  _onChange
}) => {

  return (
    <Container>
      <InputLabel>
        { label }
      </InputLabel>
      <TextInput
        spellCheck
        rows={5}
        required
        placeholder={placeholder}
        onChange={_onChange}
      />
    </Container>
  )
}

TextArea.defaultProps = {
  _onChange: () => {},
  placeholder: "insert placeholder",
  returnKeyType: "done"
}

export default TextArea;