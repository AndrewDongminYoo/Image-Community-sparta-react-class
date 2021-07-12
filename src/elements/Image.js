import React from 'react';
import styled from 'styled-components';

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}") ;
  background-size: cover;
  margin: 4px;
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
  background-size: cover;
`;

const Image = (props) => {

  const { shape, src, size } = props

  if (shape === 'circle') {
      return (
      <React.Fragment>
        <ImageCircle src={src} size={size}/>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <AspectOuter>
          <AspectInner src={src}/>
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