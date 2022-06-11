<h2 align="left"> 🛎️Wepeech 친구와 함께하는 1:1 화상 토론 서비스</h2>
<div align=center> <img src = "https://user-images.githubusercontent.com/93530462/172346130-4733321a-f8bd-4891-97be-7152be79a21b.png"/> </div>

<a href="https://wepeech.com/">
  <img width="200" alt="modal1" src="https://user-images.githubusercontent.com/57132148/172310521-cca6bb2a-a351-44c3-bc38-bc0156d4111c.png" align="center"/>
</a>



<br>
<br>
<div align="left">
<h3 align="left">📅프로젝트 기간 : 2022년 4월 22일 ~ 2022년 6월 3일 (6주)</h3>
  <h4 align="left">1주차:프로젝트 아이템 선정, 와이어프레임 및 API 명세서 작성
    <span><a href="https://www.notion.so/6-1b78959a59204708bb4a3b440986abfa">(🔗위피치 기획 노션 바로가기)</a></span></h4>
<p align="left">-simple-peer를 통한 p2p 방식으로 화상채팅 연결 및 socket을 통해 실시간 채팅 구현 결정 </p>
<h4 align="left">2주차:MVP 기능 확정 및 MVP 기능 구현 단계</h4>
<p align="left">-마이크 음질 문제+러닝커브를 고려하여 openVidu 라이브러리를 화상 채팅 및 실시간 채팅을 위한 기술 스택으로 채택 </p>
<h4 align="left">3주차:MVP 기능구현 완료, 중간 평가 시연 및 피드백</h4>
<p align="left">-캠을 켜고 토론을 하는 토론자와 토론을 관전하며 채팅을 하는 관전자의 역할 구분이 되지 않는 이슈<p>
<h4 align="left">4주차:백엔드에서 openVidu를 인터셉트해 역할을 구분해 프론트에 전달, 프론트에서 데이터를 받아 캠 연결 상황 제어</h4>
<p align="left">-기존의 openVidu에서 제공하던 채팅 기능을 분리해 socket으로 연결 후 토론방 내 화상 채팅과 실시간 채팅이 공존하도록 함 </p>
<h4 align="left">5주차:유저 피드백 진행 및 피드백 내용을 바탕으로 기능 추가 및 개선</h4>
<p align="left">-1)라이브 나우 페이지 신설 2)페이지네이션 기능 도입 3)원클릭 찬반투표 신설</p>
  <h4 align="left">6주차: 타이머 기능 추가, 버그 픽스 및 최종 발표회 시연
    <span><a href="https://www.youtube.com/watch?v=5qY561bkSC0&list=LLfeaWtXls2z-RNH8pkEwBuw">(🔗위피치 시연영상 바로가기)</a></span></h4>
<p align="left">-SSE를 통해 토론방 내 타이머 기능 도입 및 최종 배포 후 버그 픽스</p>
</div>
  
<br>
<br>
<h3 align="left">⚒️프로젝트 아키텍처</h3>
  
 |Architecture|versions|
 |---|---  |
 |<img src="https://user-images.githubusercontent.com/93530462/172407245-b3ea5ac3-88db-4684-b20b-5461a511e5b4.png"/>| <div> <p>React 18.1.0</p><p>-redux 8.0.1</p><p> -router-dom 5.3.1</p><p>-stomp 5.1.0</p><p>-styled-components 5.3.5</p><p>axios 0.27.2</p><p>sockjs-client 1.6.0</p><p>immer 9.0.12</p></div>|
  
<br>
<br>

  
<h3 align="left">📱FE 기술스택</h3>
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
<h3 align="left">💻FE Stack version</h3>
<div align="center">
  
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
 <h3 align="left">🤔FE Trouble Shooting</h3>  
 
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
  
   <h3 align="left">🙆‍♀️FE 유저피드백 개선사항</h3>  
 
  <details>
    <summary>webRtc 토론방 입장 방법 개선</summary>
      <div markdown="1">
        <br>
      기존의 토론방 입장방법의 경우 토론방을 생성한 유저가 방을 생성하면 해당 토론방이 만들어진 링크를 복사하여 상대방 및 패널에게 전달하면 링크를 받아 토론방으로 입장하는 방식, 그러나 이와같은 방식이 번거럽고, 소수의 계획된 사람들만 토론방에 입장이 가능한 것 보다는 위피치에 접속한 모든 사람들이 자신의 관심 분야에 따라 방을 선택하여 들어갈 수 있는 것이 진정한 토론 문화를 발전시키고자하는 위피치의 기획 의도와 맞다라는 피드백을 받아 Live Now라는 현재 진행 및 대기중인 토론방 내역을 보여주는 페이지를 추가하여 누구나 토론방에 들어올 수 있도록 입장 방법을 개선함
      </div>
   </details>
  <details>
    <summary>페이지네이션 기능 추가</summary>
      <div markdown="1">
        <br>
     위피치 내 유저의 활동 경험이 쌓여갈수록 유저 프로필 내 내가 참여한 토론 내역과 내가 작성한 댓글 목록, 그리고 상세 페이지 내에서 댓글의 수가 무한정으로 쌓여 원하는 정보를 찾기까지 스크롤을 계속 내려야하는 문제점이 있었음. 이를 해결하기 위해 react-paginate 라이브러리를 이용하여 서버로 부터 최신순으로 받아온 데이터 목록을 6개 혹은 10개씩 나누어 페이지네이션 시켜 유저의 사용자 경험을 향상시킴 
    </div>
   </details>
  <details>
    <summary>로그인 없이 이용가능한 서비스 개발</summary>
      <div markdown="1">
        <br>
        위피치의 핵심 서비스인 친구와 함께하는 일대일 토론의 경우 로그인이 필수인 서비스이고, 얼굴이 노출된다는 점에서 서비스 이용을 위한 허들이 높다는 피드백을 받음, 이같은 문제를 해결하고 더 많은 유저들이 위피치에서의 토론 경험을 가지게 하기 위해 메인 페이지 내에서 로그인 정보없이 iP주소를 기반으로 원클릭 찬반토론 코너를 신설하고 크롤링을 이용해 토론관련 정보를 보여주는 오늘의 뉴스 코너를 추가함
      </div>
   </details>
  
  <br>
  <br>
  
 <h3 align="left">👨‍💻FE Contributions</h3>  
  
|   Name  | GitHub | Role | 자기소개 |
| ----- | --- | --- | --- |
| 권해원🔰 | https://github.com/godnjs1582 | 화상채팅,메인(핫피치/원클릭),유저프로필, 댓글, 채팅 기능 일부, 타이머 기능, LiveOn | User-friendly한 인터페이스 구축에 관심이 많는 개발자 권해원입니다. |
| 최진용 | https://github.com/douchebag1108 | 로그인, 메인, 상세페이지, 댓글(일부), 실시간 채팅 | 근본있는 코드와 흐름이 궁금한 최진용 입니다. |
  
  
