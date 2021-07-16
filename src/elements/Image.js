import React from 'react';
import styled from 'styled-components';

const ImageCircle = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  background-image: url("${(props) => props.src}") ;
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
  opacity: ${(props) => props.isDefaultImage ? 0.5 : 1 };
  background-size: cover;
`;

const TextOnImage = styled.a`
  font-size: 28px;
  font-weight: 900;
  color: #ddd;
  text-align: center;
  vertical-align: center;
`;

const Image = (props) => {

  const { shape, src, size, isDefaultImage } = props

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
  } else if (isDefaultImage) {
    return (
      <React.Fragment>
        <AspectOuter>
          <AspectInner src={src}>
            <TextOnImage>
              "사진 업로드하기"
            </TextOnImage>
          </AspectInner>
        </AspectOuter>
    </React.Fragment>
    )
  }


}

Image.defaultProps = {
  shape: "circle",
  src: "https://firebasestorage.googleapis.com/v0/b/my-community-99787.appspot.com/o/images%2F2018-12-23-03-55-59.jpg?alt=media",
  size: 36,
}

export default Image;