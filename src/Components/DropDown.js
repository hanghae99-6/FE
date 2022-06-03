import React,{useState} from 'react';
import {Dropdown,DropdownButton} from 'react-bootstrap';
import '../Shared/App.css';
// import styled from "styled-components";

function DropDown(props) {
    // const [value,setValue]=useState('');
    const handleSelect=(e)=>{
      props.setCategoryName(e)
    }
    return (
        <DropdownButton
        title={props.children?props.children:"카테고리 선택"}
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
          >
            <Dropdown.Item id="dropdownitem1"  eventKey="정치">정치</Dropdown.Item>
            <Dropdown.Item id="dropdownitem2" eventKey="경제">경제</Dropdown.Item>
            <Dropdown.Item id="dropdownitem3" eventKey="사회">사회</Dropdown.Item>
            <Dropdown.Item id="dropdownitem4" eventKey="문화예술">문화예술</Dropdown.Item>
            <Dropdown.Item id="dropdownitem5" eventKey="해외토픽">해외토픽</Dropdown.Item>
            <Dropdown.Item id="dropdownitem6" eventKey="일상">일상</Dropdown.Item>
            <Dropdown.Item id="dropdownitem7" eventKey="IT과학">IT/과학</Dropdown.Item>
            <Dropdown.Item id="dropdownitem8" eventKey="기타">기타</Dropdown.Item>
        </DropdownButton>

    );
}

function DropDown2(props) {
  // const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    props.setSpeechMinute(e)
  }
  return (
      <DropdownButton
      title={props.children?props.children:"토론 시간"}
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
          <Dropdown.Item id="dropdownitem11" eventKey="10">10분</Dropdown.Item>
          <Dropdown.Item id="dropdownitem12" eventKey="20">20분</Dropdown.Item>
          <Dropdown.Item id="dropdownitem13" eventKey="30">30분</Dropdown.Item>
          <Dropdown.Item id="dropdownitem14" eventKey="40">40분</Dropdown.Item>
          <Dropdown.Item id="dropdownitem15" eventKey="50">50분</Dropdown.Item>
          <Dropdown.Item id="dropdownitem16" eventKey="60">60분</Dropdown.Item>
      </DropdownButton>

  );
}


// function DropDown3(props) {
//   const handleSelect=(e)=>{
//     props.setSpeechCnt(e)
//   }
//   return (
//       <DropdownButton
//       title={props.children?props.children:"턴 오버 횟수"}
//       id="dropdown-menu-align-right"
//       onSelect={handleSelect}
//         >
//           <Dropdown.Item eventKey="1">1회</Dropdown.Item>
//           <Dropdown.Item eventKey="2">2회</Dropdown.Item>
//           <Dropdown.Item eventKey="3">3회</Dropdown.Item>
//           <Dropdown.Item eventKey="4">4회</Dropdown.Item>
//           <Dropdown.Item eventKey="5">5회</Dropdown.Item>
//       </DropdownButton>

//   );
// }

// function DropDown4(props) {
//   const handleSelect=(e)=>{
//     props.setProsCons(e)
//   }
//   return (
//       <DropdownButton
//       title={props.children?props.children:"찬성/반대"}
//       id="dropdown-menu-align-right"
//       onSelect={handleSelect}
//         >
//           <Dropdown.Item eventKey="찬성">찬성</Dropdown.Item>
//           <Dropdown.Item eventKey="반대">반대</Dropdown.Item>
//       </DropdownButton>

//   );
// }

function DropDown5(props) {
  const handleSelect=(e)=>{
    props.setProsCons(e)
  }
  return (
      <DropdownButton
      title={props.children?props.children:"찬/반"}
      id="dropdown-menu-5"
      onSelect={handleSelect}
        >
          <Dropdown.Item id="dropdownitem9" eventKey="찬성">찬성</Dropdown.Item>
          <Dropdown.Item id="dropdownitem10" eventKey="반대">반대</Dropdown.Item>
      </DropdownButton>

  );
}


export {DropDown,DropDown2,DropDown5};