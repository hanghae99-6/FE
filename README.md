<h1 display="flex" align-items="center" justifyContent="center"><img src="https://user-images.githubusercontent.com/101165990/172306916-1b84c847-df2e-4801-b574-a68235437eab.png" width="30px" height="30px"/><a>Wepeech 친구와 함께하는 1:1 토론서비스</a></h1>

<br>
<a href="https://wepeech.com/"><img width="200" alt="modal1" src="https://user-images.githubusercontent.com/57132148/172310521-cca6bb2a-a351-44c3-bc38-bc0156d4111c.png" align="right"/>
<div align=center> <img src = "https://user-images.githubusercontent.com/93530462/172346130-4733321a-f8bd-4891-97be-7152be79a21b.png"/> </div>

<br>
<br>
<br>

<div align="center">
<h3 align="center">< 프로젝트 기간 : 2022년 4월 22일 ~ 2022년 6월 3일 (6주) ></h3>
<p align="center">아이템, 디자인 기획 (1주차)</p>
<p align="center">- 영상 토론 페이지를 위한 페이지 구성, 기술적 난이도와 디자인 고려</p>
<p align="center">MVP기능에 필요한 기술 도입(2주차)</p>
<p align="center">- 영상채팅에 필요한 webrtc 도입 및 socket을 이용한 실시간 채팅 구현</p>
<p align="center">기술 도입 완료하였으나 기술적 한계(3주차)</p>
<p align="center">- webRtc의 simplepeer를 통한 영상통화 구현하였으나 고질적인 음질 문제로<br>
                    openVidu 라이브러리 도입</p>
<p align="center">라이브러리 도입으로 mvp기능 구현 성공(4주차)</p>
<p align="center">- 토론을 위한 디테일과 유저의 사용성을 고려한 기능과 페이지 추가</p>
<p align="center">openVidu 기본 제공 기능의 한계(5주차)</p>
<p align="center"></p>
<p align="center">2022년 4월 22일 ~ 2022년 6월 3일 (6주)</p>
</div>
  
<br>
<br>
<br>
<br>
  
 |Architecture|versions|
 |---|---  |
 |<img src="https://user-images.githubusercontent.com/93530462/172407245-b3ea5ac3-88db-4684-b20b-5461a511e5b4.png"/>| <div> <p>React 18.1.0</p><p>-redux 8.0.1</p><p> -router-dom 5.3.1</p><p>-stomp 5.1.0</p><p>-styled-components 5.3.5</p><p>axios 0.27.2</p><p>sockjs-client 1.6.0</p><p>immer 9.0.12</p></div>|
  
<br>
<br>
<br>
<br>
  
<h2 width="60" align="center">Stacks</h2>
  <br>
<div width="100" align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> 
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<br>
<img src="https://img.shields.io/badge/SockJs-02B78F?style=for-the-badge&logo=SockJs&logoColor=white">
<img src="https://img.shields.io/badge/Stomp-4A86CF?style=for-the-badge&logo=Stomp&logoColor=white">
<img src="https://img.shields.io/badge/WebRtc-E2001A?style=for-the-badge&logo=WebRtc&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Styled Components-F893D1?style=for-the-badge&logo=styledComponents&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Axios-764ABC?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">
<img src="https://img.shields.io/badge/Immer-00E7C3?style=for-the-badge&logo=Immer&logoColor=white">
<img src="https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=Npm&logoColor=white">
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=Yarn&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">

</div>

<br>
<br>
<br>
  <br>
  
<div align="center">
<h3>versions</h3>
  
  |name|ver|
|------|---|
| React |18.1.0|
|-redux |8.0.1|
|-router-dom |5.3.1|
|-stomp |5.1.0|
| styled-components |5.3.5|
| axios |0.27.2|
| sockjs-client |1.6.0|
| immer |9.0.12|
  
</div>
  
  <br>
  <br>
  <br>
  <br>
  
 <h2 align="center">Trouble Shooting</h2>
  <details>
    <summary>webRtc 보안</summary>
      <div markdown="1">
        <br>
       webRtc의 simplepeer 라이브러리에서 카메라와 마이크에 접근 할 수 있는 getUsermedia() 코드를 입력후 테스트 해보았으나, 사용자의 데이터스트림에 접근하지 못하는 현상을 발 견. webRtc가 실시간 데이터 송수신 기술이다 보니 로컬환경에서는 보안상의 문제로 연결을 할 수 없는 것이 문제 였고, https로 배포된 환경이 필요. 처음에는 S3버킷으로 배포를 시도 하였으나 별도의 인증서 발급과 등록이 없으면 배포에 시간이 걸리는 점을 알게 되어, 별도의 서버 필요없이 https로 바로 배포되는 Firebase를 채택하여 매끄럽게 진행이 가능해 졌습니다
      </div>
   </details>
  <details>
    <summary>마이크 하울링</summary>
      <div markdown="1">
        <br>
       ecoCancellation으로 제어를 시도했으나 원활한 소통 불가. <br> 더 나은 음질을 위해 이미 검증된 오픈소스나 라이브러리로 기능 개발을 추진하는 과정에서 쿠렌토가 가장 기본적인 미디어 서버만 제공하고 turn 서버와 같은 공인 ip주소를 돌려주는 역할을 하기 위해서는 추가로 연결하는 작업이 필요하여 러닝커브가 높다고 판단. 결과적으로 쿠렌토와 turn서버를 함께 제공하는 openvidu 오픈소스를 채택하여 빠르게 핵심 기능 개발.
    </div>
   </details>
  <details>
    <summary>유저의 역할에 따른 조건부 렌더링</summary>
      <div markdown="1">
        <br>
        openVidu가 기본적으로 제공하는 기능은, 토론자와 패널의 역할에 따라 다른 권한을 부여하는 기획을 구현기에는 부족. subscriber와 publisher을 분리하여 미디어 송출 여부를 결정하고 모두가 채팅에 참여할 수 있게 openVidu의 기본틀을 커스터마이징하는 과정이 필요. 하지만 sub/pub을 분리하는 것은 같은 서버에의 webRtc 통신에서는 불가능. 따라서 영상은 기존의 openVidu 서버를 사용하고, 채팅을 비롯한 부가적인 기능은 webSocket과 Stomp를 이용해 Spring 서버에 직접 연결하여 개별적인 컨트롤 성공.
      </div>
   </details>
  
  <br>
  <br>
  <br>
  
 <h4 align="center">wepeech의 얼굴</h4>
  
|   Name  | GitHub | Role | 자기소개 |
| ----- | --- | --- | --- |
| 권해원🔰 | https://github.com/godnjs1582 | 화상채팅,메인(핫피치/원클릭),유저프로필, 댓글, 채팅 기능 일부, 타이머 기능, LiveOn | User-friendly한 인터페이스 구축에 관심이 많는 개발자 권해원입니다. |
| 최진용 | https://github.com/douchebag1108 | 로그인, 메인, 상세페이지, 댓글(일부), 실시간 채팅 | 근본있는 코드와 흐름이 궁금한 최진용 입니다. |
  
  <br>
  <br>
  <br>
  
  
