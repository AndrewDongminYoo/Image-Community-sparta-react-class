import React from 'react';
import styled from 'styled-components';

const ImageCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  background-image: url("${(props) => props.src}") ;
  background-color: #FFFFE0;
  background-size: cover;
  margin: 4px 4px auto 4px;
`;

const AspectOuter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}") ;
  background-color: #FFFFE0;
  background-size: cover;
  text-align: center;
  vertical-align: center;
`;

const Image = ({ shape, src, size }) => {

  if (shape === 'circle') {
      return (
      <React.Fragment>
        <ImageCircle src={src} size={size}/>
      </React.Fragment>
    )
  } else if (shape === 'rectangle') {
    return (
      <React.Fragment>
        <AspectOuter>
          <AspectInner src={src}/>
        </AspectOuter>
      </React.Fragment>
    )
  } else {
    return null
  }
}

Image.defaultProps = {
  shape: "circle",
  src: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  size: 36,
}

export default Image;