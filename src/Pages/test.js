import React, { Component } from 'react';
import axios from 'axios';
import './DebateRoom.css';
import { OpenVidu } from 'openvidu-browser';
import StreamComponent from '../Components/stream/StreamComponent';
import DialogExtensionComponent from '../Components/dialog-extension/DialogExtension';
import ChatComponent from '../Components/chat/ChatComponent';
import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from '../Components/toolbar/ToolbarComponent';
import styled from "styled-components";
import Devote from '../Components/Devote';
import DebateNotice from "../Components/DebateNotice";
import DebateContents from "../Components/DebateContents";
import UserCheck from "./UserCheck";
import LinkModal from '../Components/LinkModal';
import MyTimer from "../Components/Timer";
import { connect } from "react-redux";
import room, { ActionCreators as RoomActions} from "../redux/modules/room";
import jwt_decode from "jwt-decode";
const OPENVIDU_SERVER_URL = `${process.env.REACT_APP_OPENVIDU_SERVER_URL}`;
const OPENVIDU_SERVER_SECRET =`${process.env.REACT_APP_SERVER_SECRET}`;

var localUser = new UserModel();

class DebateRoom extends Component {
    constructor(props) {
        super(props);
        this.hasBeenUpdated = false;
        this.layout = new OpenViduLayout();//오픈비듀 레이아웃 객체 생성
        let sessionName =this.props.match.params.roomId? this.props.match.params.roomId:"sdfsd" ;
        this.room_id=location.pathname.split("/debate/")[1];
        this.remotes = [];
        this.localUserAccessAllowed = false;
        this.state = {
            mySessionId: sessionName, 
            myUserName: "godnjs",
            session:undefined,
            localUser: undefined,
            subscribers: [],
            chatDisplay: true,
            currentVideoDevice: undefined,
            username:undefined,
            started:false,
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.updateLayout = this.updateLayout.bind(this);
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.nicknameChanged = this.nicknameChanged.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.closeDialogExtension = this.closeDialogExtension.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
        this.stateStageChange=this.stateStageChange.bind(this);
        this.handleChangeSessionId=this.handleChangeSessionId.bind(this);
        this.handleChangeUserName=this.handleChangeUserName.bind(this);
        this.endDebate=this.endDebate.bind(this);
    }
 
    componentDidMount() {
        window.addEventListener("beforeunload", this._confirm);
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = this._backConfirm;
        const openViduLayoutOptions = {
            maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
            minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
            fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
            bigClass: 'OV_big', // The class to add to elements that should be sized bigger
            bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
            bigFixedRatio: false, // fixedRatio for the big ones
            bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
            bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
            bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
            animate: true, // Whether you want to animate the transitions
        };
        this.layout.initLayoutContainer(document.getElementById('layout'), openViduLayoutOptions);
        window.addEventListener('beforeunload', this.onbeforeunload);
        window.addEventListener('resize', this.updateLayout);
        window.addEventListener('resize', this.checkSize);
        this.props.getRoom(this.room_id);
        this.joinSession();
        this.handleChangeUserName();       
    }
    _backConfirm = async () => {
        const roomId =this.state.mySessionId;
        let event =  this.props.history.replace(`/saveDebate/${roomId}`)
        if(event){
            window.history.pushState(null, "", window.location.href);
        }
    }
    _confirm = (e) => {
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this._confirm);
        window.onpopstate = () => { }
        window.removeEventListener('beforeunload', this.onbeforeunload);
        window.removeEventListener('resize', this.updateLayout);
        window.removeEventListener('resize', this.checkSize);
        this.leaveSession();
    
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    joinSession() {
        this.OV = new OpenVidu(); //오픈비듀 객체의 생성 
        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                this.subscribeToStreamCreated();
                this.connectToSession(); 
            }
        );
    }

    connectToSession() {
        if (this.props.token !== undefined) {
            this.connect(this.props.token);
        } else {
            this.getToken().then((token) => {
                this.connect(token);
            }).catch((error) => {
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error getting the token:', error.message);
              });
        }
    }

    connect(token) {
        this.state.session
            .connect(
                token,
                { clientData: this.state.myUserName },
            )
            .then(() => {
                    this.connectWebCam(); 
            })
            .catch((error) => {
                if(this.props.error){
                    this.props.error({ error: error.error, messgae: error.message, code: error.code, status: error.status });
                }
                alert('There was an error connecting to the session:', error.message);
            });
    }

    async connectWebCam() {
        var devices = await this.OV.getDevices();
        const is_publisher=this.props.room.is_user;
            let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
            })
        if (this.state.session.capabilities.publish) {
            publisher.on('accessAllowed' , () => {
                this.state.session.publish(publisher).then(() => {
                    this.updateSubscribers();
                    this.localUserAccessAllowed = true;
                    if (this.props.joinSession) {
                        this.props.joinSession();
                    } 
                });
            });
           
        }

        localUser.setNickname(this.state.myUserName);
        localUser.setConnectionId(this.state.session.connection.connectionId);
        localUser.setScreenShareActive(false);
        localUser.setStreamManager(publisher);
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
        this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });

        this.setState({ currentVideoDevice: videoDevices[0], localUser: localUser }, () => {
            this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
                this.updateLayout();
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            });
        });
    }

    updateSubscribers() {
        var subscribers = this.remotes;
        this.setState(
            {
                subscribers: subscribers,
            },
            () => {
                if (this.state.localUser) {
                    this.sendSignalUserChanged({
                        isAudioActive: this.state.localUser.isAudioActive(),
                        isVideoActive: this.state.localUser.isVideoActive(),
                        nickname: this.state.localUser.getNickname(),
                        isScreenShareActive: this.state.localUser.isScreenShareActive(),
                    });
                }
                this.updateLayout();
            },
        );
    }

    leaveSession() {
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
            localUser: undefined,
        });
        if (this.props.leaveSession) {
            this.props.leaveSession();
        }
    }
    camStatusChanged() {
        localUser.setVideoActive(!localUser.isVideoActive());
        localUser.getStreamManager().publishVideo(localUser.isVideoActive());
        this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
        this.setState({ localUser: localUser });
    }

    micStatusChanged() {
        localUser.setAudioActive(!localUser.isAudioActive());
        localUser.getStreamManager().publishAudio(localUser.isAudioActive());
        this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
        this.setState({ localUser: localUser });
    }

    nicknameChanged(nickname) {
        let localUser = this.state.localUser;
        localUser.setNickname(nickname);
        this.setState({ localUser: localUser });
        this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() });
    }

    deleteSubscriber(stream) {
        const remoteUsers = this.state.subscribers;
        const userStream = remoteUsers.filter((user) => user.getStreamManager().stream === stream)[0];
        let index = remoteUsers.indexOf(userStream, 0);
        if (index > -1) {
            remoteUsers.splice(index, 1);
            this.setState({
                subscribers: remoteUsers,
            });
        }
    }

    subscribeToStreamCreated() {
        this.state.session.on('streamCreated', (event) => {
            const subscriber = this.state.session.subscribe(event.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                this.checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove('custom-class');
            });
            const newUser = new UserModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(event.stream.connection.connectionId);
            newUser.setType('remote');
            const nickname = event.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            this.remotes.push(newUser);
            if(this.localUserAccessAllowed) {
                this.updateSubscribers();
            }
        });
    }

    subscribeToStreamDestroyed() {
        // On every Stream destroyed...
        this.state.session.on('streamDestroyed', (event) => {
            // Remove the stream from 'subscribers' array
            this.deleteSubscriber(event.stream);
            setTimeout(() => {
                this.checkSomeoneShareScreen();
            }, 20);
            event.preventDefault();
            this.updateLayout();
        });
    }

    subscribeToUserChanged() {
        this.state.session.on('signal:userChanged', (event) => {
            let remoteUsers = this.state.subscribers;
            remoteUsers.forEach((user) => {
                if (user.getConnectionId() === event.from.connectionId) {
                    const data = JSON.parse(event.data);
                    if (data.isAudioActive !== undefined) {
                        user.setAudioActive(data.isAudioActive);
                    }
                    if (data.isVideoActive !== undefined) {
                        user.setVideoActive(data.isVideoActive);
                    }
                    if (data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if (data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            this.setState(
                {
                    subscribers: remoteUsers,
                },
                () => this.checkSomeoneShareScreen(),
            );
        });
    }
    updateLayout() {
        setTimeout(() => {
            this.layout.updateLayout();
        }, 20);
    }

    handleChangeUserName(){
        const userInfo= jwt_decode(document.cookie)?jwt_decode(document.cookie):null;
        // const userEmail = userInfo.EMAIL;
        const userNickname=userInfo.NICK_NAME;
        this.setState({
                myUserName:userNickname,
            });
    }
    handleChangeSessionId(e){
        this.setState({
            mySessionId:e.target.value,
        });
    }
    sendSignalUserChanged(data) {
        const signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged',
        };
        this.state.session.signal(signalOptions);
    }

    toggleFullscreen() {
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    async switchCamera() {
        try{
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if(videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    var newPublisher = this.OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: localUser.isAudioActive(),
                        publishVideo: localUser.isVideoActive(),
                        mirror: true
                    });
                    await this.state.session.unpublish(this.state.localUser.getStreamManager());
                    await this.state.session.publish(newPublisher)
                    this.state.localUser.setStreamManager(newPublisher);
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        localUser: localUser,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

   

    screenShare() {
        const videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
        const publisher = this.OV.initPublisher(
            undefined,
            {
                videoSource: videoSource,
                publishAudio: localUser.isAudioActive(),
                publishVideo: localUser.isVideoActive(),
                mirror: false,
            },
            (error) => {
                if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                    this.setState({ showExtensionDialog: true });
                } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                    alert('Your browser does not support screen sharing');
                } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
                    alert('You need to enable screen sharing extension');
                } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
                    alert('You need to choose a window or application to share');
                }
            },
        );

        publisher.once('accessAllowed', () => {
            this.state.session.unpublish(localUser.getStreamManager());
            localUser.setStreamManager(publisher);
            this.state.session.publish(localUser.getStreamManager()).then(() => {
                localUser.setScreenShareActive(true);
                this.setState({ localUser: localUser }, () => {
                    this.sendSignalUserChanged({ isScreenShareActive: localUser.isScreenShareActive() });
                });
            });
        });
            publisher.on('streamPlaying', () => {
            this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove('custom-class');
        });
    }

    closeDialogExtension() {
        this.setState({ showExtensionDialog: false });
    }
    stateStageChange() {
        this.setState({ started: true });
    }

    stopScreenShare() {
        this.state.session.unpublish(localUser.getStreamManager());
        this.connectWebCam();
    }

    checkSomeoneShareScreen() {
        let isScreenShared;
        // return true if at least one passes the test
        isScreenShared = this.state.subscribers.some((user) => user.isScreenShareActive()) || localUser.isScreenShareActive();
        const openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true,
        };
        this.layout.setLayoutOptions(openviduLayoutOptions);
        this.updateLayout();
    }

    toggleChat(property) {
        let display = property;

        if (display === undefined) {
            display = this.state.chatDisplay === 'none' ? 'block' : 'none';
        }
        if (display === 'block') {
            this.setState({ chatDisplay: display, messageReceived: false });
        } else {
            this.setState({ chatDisplay: display });
        }
        this.updateLayout();
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }
    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
            this.hasBeenUpdated = false;
        }
    }
    endDebate(){
        const roomId =this.state.mySessionId;
        this.leaveSession();
        this.props.history.replace(`/saveDebate/${roomId}`)
    };
   

    
   
    render() {
        const is_started=this.state.started;
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const localUser = this.state.localUser;
        let { room } =this.props;
        let is_room=room.is_room;//방이 있는지 없는지 유효성 검사
        let is_user=room.is_user;
        let title=room.roomdata.topic;
        var chatDisplay = { display: this.state.chatDisplay };
        if(is_user==false){
            this.props.history.replace(`/userCheck/${mySessionId}`)
        }else{
            return (
            <div style={{width:"100%",height:"100%"}}>
            <LinkModal link={this.room_id}/>
            <Wrapper>
            <DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} />
            <Title>
                <div style={{display:"flex",marginLeft:"-1250px"}}>
                    <StateAlert>토론중</StateAlert>
                </div>
                <div style={{width:"960px", display:"flex", alignItems:"center" , justifyContent:"space-between", position:"absolute", top:"30px",left:"0"}}>
                    <Topic>{title}</Topic>
                    <StartBtn onClick={this.endDebate}>토론방나가기</StartBtn>
                </div>
            </Title>
            <div style={{width:"1360px", minHeight:"1080px" ,display:"flex", margin:"0 auto", position:"relative"}}>
                <div style={{zIndex:"4", position:"absolute", bottom:"540px", left:"30px"}}>
                {localUser == undefined && (
                <GreyBox>
                    <div style={{position:"absolute", bottom:"50%", left:"50%", transform:"translate(-50%,-50%"}}>마이크와 카메라를 켜주세요</div>
                </GreyBox>)}
                    <ToolbarComponent
                        sessionId={mySessionId}
                        user={localUser}
                        showNotification={this.state.messageReceived}
                        camStatusChanged={this.camStatusChanged}
                        micStatusChanged={this.micStatusChanged}
                        screenShare={this.screenShare}
                        stopScreenShare={this.stopScreenShare}
                        toggleFullscreen={this.toggleFullscreen}
                        switchCamera={this.switchCamera}
                        leaveSession={this.leaveSession}
                        toggleChat={this.toggleChat}
                    />
                </div>
                <div style={{position:"absolute", top:"540px", left:"528px"}}>
                <GreyBox>
                    <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",textAlign:"center"}}>토론자가 아직 <br/>입장하지 않았습니다</div>
                </GreyBox>
                </div>
                <div style={{width:"1360px", height:"1080px", margin:"0 auto", position:"relative"}}>
                    <div style={{position:"absolute",left:"0"}}>
                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                    <div className="OT_root OT_publisher custom-class" id="localUser" style={{paddingRight:"10px", boxSizing:"borderBox"}}>
                           <StreamComponent user={localUser} handleNickname={this.nicknameChanged}/> 
                    </div>
                )}
                    </div>
               
                <div style={{position:"absolute",left:"478px"}}>
                    {this.state.subscribers.map((sub, i) => (
                    <div key={i} className="OT_root OT_publisher custom-class" id="remoteUsers" style={{paddingLeft:"20px", boxSizing:"borderBox"}}>
                        <StreamComponent user={sub} streamId={sub.streamManager.stream.streamId} />
                    </div>
                     ))}
                </div>
                <div style={{position:"absolute",right:"0"}}>
                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                    <div  style={chatDisplay}>
                        <ChatComponent
                            user={localUser}
                            chatDisplay={this.state.chatDisplay}
                            close={this.toggleChat}
                            messageReceived={this.checkNotification}
                        />
                    </div>
                )}
                </div>
                </div>
                </div>
            {/* <Devote></Devote> */}
            <div style={{marginTop:"-400px"}}>
            <DebateNotice></DebateNotice>
            <DebateContents></DebateContents>
            </div>
            
        </Wrapper> 
        </div>
        )
        }
    }
    

                   


               

  

    
    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
     *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
     *   3) The token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }


    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL  + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error.response && error.response.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' + this.OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                    this.OPENVIDU_SERVER_URL +
                                    '"\n\nClick OK to navigate and accept it. ' +
                                    'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                    this.OPENVIDU_SERVER_URL +
                                    '"',
                            )
                        ) {
                            window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({});
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

const mapStateToProps = (state) => ({
    room: state.room
});

const mapDispatchToProps = (dispatch) => {
    return{
        getRoom: (room_id) => dispatch(RoomActions.getRoomDB(room_id)),
        // roomCheck:(room_id,myUserName) => dispatch(RoomActions.roomCheckDB(room_id,myUserName)),
        // usernameCheck:(room_id,username) =>dispatch(RoomActions.usernameCheckDB(room_id,username))
    }    
  }

const Wrapper=styled.div`
max-width:1360px;
margin:0 auto;
margin-top:100px;
// background:red;
// filter: blur(10px);
//   -webkit-filter: blur(10px);
`
const Title=styled.div`
width:100%;
height:100px;
align-items:center;
color:black;
vertical-align:middle;
display:flex;
flex-direction:column;
margin-top:10px;
justify-content:space-between;
position:relative;
h1{
    font-size:26px;
}
`
const Topic =styled.div`
font-size:24px;
color:black;
font-weight:600;

`
const StartBtn=styled.div`
width:166px;
height:48px;
padding:10px 10px;
border-radius:30px;
background:#F5F6F8;
border:none;
font-size:16px;
text-align:center;
cursor:pointer;
&:hover{
    background:#FF5912;
    color:white;
}
`
const GreyBox=styled.div`
width:468px;
height:600px;
background:#F5F6F8;
border-radius:30px;
position:absolute;
top:-540px;
left:-29px;
`


const StateAlert=styled.div`
text-align:center;
width:100px;
padding:5px 10px;
${({ started }) => started? `background: #FF5912;`:`background:#F5F6F8;`}
${({ started }) => started? `color: white;`:`color:black;`}
border-radius:5px;
font-size:14px;
box-sizing:border-box;
margin:0px 10px 0px 0px;

`

const ModalBg=styled.div`
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
position:fixed;
z-index:3;
display:flex;
flex-direction:colunm;
justify-content:center;
align-items:center;
`
const ModalWrapper=styled.div`
width:400px;
height:400px;
background:white;
z-index:2;
position:absolute;
top:50%;
left:50%;
transform:translate(-50%,-50%);
border-radius:30px;
padding:20px;
box-sizing:border-box;
`
const FullInput=styled.input`
width:100%;
padding:10px;
background: #ECECEC;
border:none;
border-radius:10px;
box-sizing:border-box;
`
const TitleText=styled.p`
font-size:14px;
font-weight:600;
color: grey;
margin:0;
padding:0;
margin:5px 0px;
cursor:pointer;

`

const CreateRoomBtn=styled.div`
width:150px;
padding:10px;
background:lightgrey;
border-radius:10px;
text-align:center;
cursor:pointer;
&:hover {
    background:black;
    color: white;
}
`


export default connect(mapStateToProps,mapDispatchToProps)(DebateRoom) ;