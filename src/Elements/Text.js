import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, lineHeight, display, textAlign, overflow, textOverflow, is_link, href, textDecoration, pointerEvents,width, height, flex} = props;;;

  const styles = { 
    bold: bold, 
    color: color, 
    size: size,
    margin: margin,
    lineHeight: lineHeight,
    display: display,
    textAlign: textAlign,
    overflow: overflow,
    textOverflow: textOverflow,
    width: width,
    height: height,
    flex: flex,
  };


  const linkStyles = {
    color: color,
    display: display,
    textAlign: textAlign,
    size: size,
    margin: margin,
    bold: bold,
    textDecoration: textDecoration,
    href: href,
    pointerEvents: pointerEvents,
  }

  if(is_link){
    return(
      <A {...linkStyles}>{children}</A>
    )
  };
  
  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  width: "",
  height: "",
  is_link: false,
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
};

const P = styled.p`
  flex: ${(props) => props.flex};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: ${(props) => props.display};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold)};
  line-height: ${(props) => props.lineHeight};
  overflow: ${(props) => props.overflow};
  /* textOverflow: ${(props) => props.textOverflow}; */
  text-align: ${(props) => props.textAlign};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
`;

const A = styled.a`
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.textDecoration};
  display: ${(props) => props.display};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold)};
  text-align: ${(props) => props.textAlign};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  pointer-events: ${(props) => props.pointerEvents};
  &:hover {
    color: ${(props) => props.color};
}
`

export default Text;