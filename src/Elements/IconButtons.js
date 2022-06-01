import React from "react";
import styled from "styled-components";
import { AiOutlineVideoCamera,AiOutlineClose } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs"
import { IoMdMicOff } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { BiCopyAlt } from "react-icons/bi";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { HiPaperAirplane } from "react-icons/hi";
import { BsPencilSquare } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import { RiCalendar2Fill } from "react-icons/ri";
import { IoMdThumbsDown } from "react-icons/io";
import { BsPeopleFill} from "react-icons/bs";
import { ImBubble } from "react-icons/im";
import { RiEmotionUnhappyFill } from "react-icons/ri";
import { RiEmotionHappyFill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { IoMdThumbsUp } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { IoIosAlert } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiTimerFill } from "react-icons/ri";
import { IoChatbubble }  from "react-icons/io";
import { RiChat3Fill } from "react-icons/ri"

const IconButtons = (props) => {
  const {
    _onClick,
    alert,
    checked,
    chat,
    trash,
    happyFill,
    VideocamIcon,
    Airplane,
    clock,
    MicOff,
    MicOn,
    size,
    height,
    margin,
    good,
    bad,
    padding,
    cursor,
    color,
    zIndex,
    People,
    check,
    cancle,
    Pencil,
    VideoOn,
    VideoOff,
    Calender,
    people,
    unhappyLine,
    unhappyFill,
    save,
    copy,
    hover,
  } = props;

  const styles = {
    hover:hover,
    padding: padding,
    size: size,
    height: height,
    margin: margin,
    cursor: cursor,
    color: color,
    zIndex:zIndex,
  };

  //아이콘 작동
  if (clock) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiTimerFill size={size} onClick={_onClick}></RiTimerFill >
        </Icon>
      </React.Fragment>
    );
  }
  if (alert) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoIosAlert size={size} onClick={_onClick}></IoIosAlert >
        </Icon>
      </React.Fragment>
    );
  }
  if (checked) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoIosCheckmarkCircle  size={size} onClick={_onClick}></IoIosCheckmarkCircle >
        </Icon>
      </React.Fragment>
    );
  }


  if (VideocamIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiOutlineVideoCamera size={size} onClick={_onClick}></AiOutlineVideoCamera>
        </Icon>
      </React.Fragment>
    );
  }
  if (trash) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          < BsFillTrashFill size={size} onClick={_onClick}></ BsFillTrashFill>
        </Icon>
      </React.Fragment>
    );
  }

  if (chat) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiChat3Fill size={size} onClick={_onClick}></RiChat3Fill>
        </Icon>
      </React.Fragment>
    );
  }

  if (people) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsPeopleFill size={size} onClick={_onClick}></BsPeopleFill>
        </Icon>
      </React.Fragment>
    );
  }
  if (happyFill) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiEmotionHappyFill size={size} onClick={_onClick}></RiEmotionHappyFill >
        </Icon>
      </React.Fragment>
    );
  }
  if (unhappyFill) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiEmotionUnhappyFill  size={size} onClick={_onClick}></RiEmotionUnhappyFill>
        </Icon>
      </React.Fragment>
    );
  }

  if (good) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoMdThumbsUp size={size} onClick={_onClick}></IoMdThumbsUp>
        </Icon>
      </React.Fragment>
    );
  }

  if (bad) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoMdThumbsDown size={size} onClick={_onClick}></IoMdThumbsDown>
        </Icon>
      </React.Fragment>
    );
  }
  if (Calender) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiCalendar2Fill size={size} onClick={_onClick}></RiCalendar2Fill>
        </Icon>
      </React.Fragment>
    );
  }


  if (save) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdOutlineSaveAlt size={size} onClick={_onClick}></MdOutlineSaveAlt>
        </Icon>
      </React.Fragment>
    );
  }
  if (Airplane) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <HiPaperAirplane size ={size} onClick={_onClick}></HiPaperAirplane>
        </Icon>
      </React.Fragment>
    );
  }
  if(VideoOn){
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsFillCameraVideoFill size={size} onClick={_onClick}></BsFillCameraVideoFill>
        </Icon>
      </React.Fragment>
    );
  }
  if(VideoOff){
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsFillCameraVideoOffFill size={size} onClick={_onClick}></BsFillCameraVideoOffFill>
        </Icon>
      </React.Fragment>
    );
  }
  if (MicOn) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsFillMicFill  size={size} onClick={_onClick}></BsFillMicFill >
        </Icon>
      </React.Fragment>
    );
  }
  if (MicOff) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoMdMicOff  size={size} onClick={_onClick}></IoMdMicOff >
        </Icon>
      </React.Fragment>
    );
  }
  if (People) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsFillPeopleFill  size={size} onClick={_onClick}></BsFillPeopleFill >
        </Icon>
      </React.Fragment>
    );
  }

  if (cancle) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiOutlineClose size={size} onClick={_onClick}></AiOutlineClose>
        </Icon>
      </React.Fragment>
    );
  }

  if (check) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsCheckLg size={size} onClick={_onClick}></BsCheckLg>
        </Icon>
      </React.Fragment>
    );
  }

  if (Pencil) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiPencilFill  size={size} onClick={_onClick}></RiPencilFill>
        </Icon>
      </React.Fragment>
    );
  }

  if (copy) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BiCopyAlt size={size} onClick={_onClick}></BiCopyAlt>
        </Icon>
      </React.Fragment>
    );
  }
  return <React.Fragment></React.Fragment>;
};
 

// IconButton DefaultProps
IconButtons.defaultProps = {
  delete: false,
  size: "24px",
  height: "24px",
  margin: null,
  padding: null,
  _onClick: () => {},
  likeIcon: false,
  unLikeIcon: false,
  commentIcon: false,
  plusIcon: false,
  checkIcon: false,
  leftArrowIcon: false,
  moreView: false,
  width: "100%",
  cursor: "pointer",
  color: "white",
  zIndex:null,
};

const Icon = styled.div`
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  ${(props) => (props.color ? `color:${props.color};` : "")}
  z-index: ${(props) => props.zIndex};
`;

export default IconButtons;