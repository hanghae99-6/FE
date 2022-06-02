import { color } from "@mui/system";
import React from "react";

import styled from "styled-components";
import BaseImage from "../Assets/basicprofile(gray).png"

const Image = (props) => {

  const { shape, src, size, paddingLeft, width, height, position, radius, margin, onMouseOver, onMouseOut, _onClick, border} = props;

  const styles = {
    src: src,
    size: size,
    paddingLeft: paddingLeft,
    width: width,
    height: height,
    shape: shape,
    position: position,
    radius: radius,
    onMouseOver: onMouseOver,
    onMouseOut: onMouseOut,
    onClick:_onClick,
    width: width,
    height: height,
    border: border,
    margin: margin,
  }

  //프로필 이미지
  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  //게시물 이미지
  if (shape === "rectangle") {
    return (
        <AspectInner {...styles}></AspectInner>
    );
  }

  return (
    <AspectOutter>
      <AspectInner onClick={props._onClick}></AspectInner>
    </AspectOutter>
  );
};

Image.defaultProps = {
  shape: "circle",
  _onClick: () => {},
  src:{BaseImage},
  width: "100px",
  size: 36,
  paddingLeft: false,
};


const AspectOutter = styled.div`
  width: 100%;
  display : flex;
  justify-content : center;
  ${(props) => (props.height ? `height: ${props.height};` : "100%")}
`;
const AspectInner = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position};
  border-radius: ${(props) => props.radius};
  overflow: hidden;
  background-size: contain;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "100%")}
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  /* onmouseover: ${(props) => props.onmouseover}
  onmouseout: ${(props) => props.onmouseout} */
`;
//프로필 이미지
const ImageCircle = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  color:${(props) => props.color};
  border:${(props) => props.border};
  margin:${(props) => props.margin};
`;

export default Image;