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
            <Dropdown.Item eventKey="정치">정치</Dropdown.Item>
            <Dropdown.Item eventKey="경제">경제</Dropdown.Item>
            <Dropdown.Item eventKey="사회">사회</Dropdown.Item>
            <Dropdown.Item eventKey="문화예술">문화예술</Dropdown.Item>
            <Dropdown.Item eventKey="해외토픽">해외토픽</Dropdown.Item>
            <Dropdown.Item eventKey="일상">일상</Dropdown.Item>
            <Dropdown.Item eventKey="IT과학">IT/과학</Dropdown.Item>
            <Dropdown.Item eventKey="기타">기타</Dropdown.Item>
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
      title={props.children?props.children:"1회 발언 시간"}
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">1분</Dropdown.Item>
          <Dropdown.Item eventKey="3">3분</Dropdown.Item>
          <Dropdown.Item eventKey="5">5분</Dropdown.Item>
          <Dropdown.Item eventKey="7">7분</Dropdown.Item>
          <Dropdown.Item eventKey="10">10분</Dropdown.Item>
          <Dropdown.Item eventKey="15">15분</Dropdown.Item>
          <Dropdown.Item eventKey="20">20분</Dropdown.Item>
      </DropdownButton>

  );
}


function DropDown3(props) {
  const handleSelect=(e)=>{
    props.setSpeechCnt(e)
  }
  return (
      <DropdownButton
      title={props.children?props.children:"턴 오버 횟수"}
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="1">1회</Dropdown.Item>
          <Dropdown.Item eventKey="2">2회</Dropdown.Item>
          <Dropdown.Item eventKey="3">3회</Dropdown.Item>
          <Dropdown.Item eventKey="4">4회</Dropdown.Item>
          <Dropdown.Item eventKey="5">5회</Dropdown.Item>
      </DropdownButton>

  );
}

function DropDown4(props) {
  const handleSelect=(e)=>{
    props.setProsCons(e)
  }
  return (
      <DropdownButton
      title={props.children?props.children:"찬성/반대"}
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="찬성">찬성</Dropdown.Item>
          <Dropdown.Item eventKey="반대">반대</Dropdown.Item>
      </DropdownButton>

  );
}

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
          <Dropdown.Item bsClass="dropdown1" eventKey="찬성">찬성</Dropdown.Item>
          <Dropdown.Item bsClass="dropdown1" eventKey="반대">반대</Dropdown.Item>
      </DropdownButton>

  );
}


export {DropDown,DropDown2,DropDown3,DropDown4,DropDown5};