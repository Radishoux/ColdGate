import './App.css';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import axios from 'axios';

import menus from "./logo/menu.png"
import arrow from "./logo/left-arrow.png"
import user from "./logo/user.png"
import userPro from "./logo/user2.png"
import settings from "./logo/settings.png"
import send from "./logo/send.png"

import Socket from 'socket.io-client';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
Amplify.configure(awsconfig);

const { Title } = Typography;

var socket = Socket('http://localhost:3001');
// socket.emit('chat message', "je suis co");


// var socket = Socket('http://localhost:3001');

Auth.currentAuthenticatedUser().then(function (u) {
    console.log(u);
    socket.emit('id socket', u);
})



// function getco() {
//     socket.emit('id socket', u);
// }

function App() {
    const [indexConv, setindexConv] = useState(0);
    const [side, setSide] = useState(true);
    const [talkinto, setTalkinto] = useState();
    const [conversations, setConv] = useState([]);
    const [sideContent, setSideContent] = useState("20%");
    const [sideVisibiliy, setSideVisibiliy] = useState(6);
    const [buttonVis, setbuttonVis] = useState("none");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    // const [conversations, setConv] = useState(["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", "user11", "user12"]);
    const [AllMess, setMessage] = useState([{ user: 1, message: "Hello there and welcome to Coldgate" }, { user: 1, message: "Please select a user to talk to" }, { user: 1, message: "←←←" }])


    // const [conversations, setConv] = useState(["user1", "user2", "user3"]);

    socket.on("whoco", colist => {
        var tmpconvs = [];
        for (var co in colist) tmpconvs.push(co);
        setConv(tmpconvs);
    })

    socket.on("new msg", msg => {
        console.log(`${msg.from}: ${msg.content}`)
    })

    function changeSide() {
        if (side) {
            setSideVisibiliy(0)
            setSideContent("0%")
            setSide(false)
            setbuttonVis("block")
        } else {
            setSide(true)
            setSideVisibiliy(6)
            setSideContent("20%")
            setbuttonVis("none")
        }
    }

    function addMess() {
        if (document.getElementById("msg").value !== "") {
            setMessage(state => [...state, { user: 0, message: document.getElementById("msg").value }]);
            socket.emit('chat message', { to: talkinto, content: document.getElementById("msg").value });
            document.getElementById("msg").value = "";
        }
    }

    // function addMess(e) {
    //     if (e.key === 'Enter') {
    //         if (e.target.value !== "") {
    //             setMessage(state => [...state, { user: 0, message: e.target.value }]);
    //             setTimeout(() => { document.getElementById("msg").value = ""; }, 100);
    //         }
    //     }
    // }
    // function addMessbtn() {
    //     if (document.getElementById("msg").value !== "") {
    //         setMessage(state => [...state, { user: 0, message: document.getElementById("msg").value }]);
    //         setTimeout(() => { document.getElementById("msg").value = ""; }, 100);
    //     }
    // }

    function Convs(conv) {
        return conv.map((elem, index) => {
            return (
                <li className="liUser" style={{ backgroundColor: indexConv === index ? "#28334e" : "#1a2236" }} id={elem} onClick={() => setindexConv(index), setTalkinto(elem)} key={index}>
                    <figure className="userFigure">
                        <img className="userImg" src={user}></img>
                    </figure>
                    <div>
                        <Title style={{ color: "white", marginTop: "1rem", marginBottom: "0.7rem" }} level={5}>{elem}</Title>

                        <p className="pUser" style={{ maxWidth: "100%" }}></p>
                    </div>
                </li>
            )
        })
    }

    function messages(mess) {
        return mess.map((elem, index) => {
            if (elem.user === 1) {
                return (
                    <div className="msgRdiv" key={index}>

                        <p className="msgReceiv">{elem.message}</p>

                    </div>
                )
            } else {
                return (
                    <div className="msgSdiv" key={index}>

                        <p className="msgSend">{elem.message}</p>

                    </div>
                )
            }
        })
    }

    // Fonction modal User Profile
    function showModal() {
        setIsModalVisible(true);
    };

    function handleOk() {
        setIsModalVisible(false);
    };

    function handleCancel() {
        setIsModalVisible(false);
    };


    // Fonction modal settings
    function showSettings() {
        setIsSettingsVisible(true);
    };

    function handleOkSettings() {
        setIsSettingsVisible(false);
    };

    function handleCancelSettings() {
        setIsSettingsVisible(false);
    };

    return (
        <div className="App">

            <div className="outer divCentral">
                <AmplifySignOut />
                <Modal
                    title="User Profile"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <p style={{ float: "left", marginRight: "4vh" }}>Profil Pic:</p>
                    <img className="userImg" style={{ marginBottom: "2vh" }} src={user}></img>
                    <p>Username : test</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal
                    title="Settings"
                    visible={isSettingsVisible}
                    onOk={handleOkSettings}
                    onCancel={handleCancelSettings}
                    footer={null}
                >
                    <p>Some contents...</p>
                </Modal>
                <Row>
                    <Col xs={1} className="one">
                        {/* <button onClick={() => tests()}></button> */}
                        <img src={menus} onClick={changeSide} style={{ width: "3.5vh", marginTop: "1vh", float: "left", marginLeft: "1.5vh", display: buttonVis, cursor: "pointer" }}></img>
                        <img src={userPro} onClick={showModal} style={{ width: "3.5vh", marginTop: "5vh", float: "left", marginLeft: "1.5vh", cursor: "pointer" }}></img>
                        <img src={settings} onClick={showSettings} style={{ width: "3.5vh", marginTop: "5vh", float: "left", marginLeft: "1.5vh", cursor: "pointer" }}></img>

                    </Col>

                    <Col style={{ position: "relative" }} xs={sideVisibiliy} className="two">

                        <div className="ulTop">
                            <Title style={{ marginTop: "1vh", float: "left", marginLeft: "5vh", color: "white" }} level={3}>Chats</Title>
                            <h3 ></h3>

                            <img src={arrow} onClick={changeSide} style={{ float: "right", width: "3vh", marginTop: "1vh", cursor: "pointer" }}></img>
                        </div>


                        <ul id="ulUser" className="ulUser">
                            {Convs(conversations)}
                        </ul>

                    </Col>

                    <Col flex={5} className="three">
                        <div style={{ padding: "10px 0" }}>
                            {messages(AllMess)}
                        </div>

                    </Col>
                </Row>
                <div className="footerMess">
                    <div className="form__group field">
                        <input type="reset" autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter') addMess(); }} type="input" className="form__field" placeholder="Msg" name="msg" id='msg' required />
                        <label htmlFor="name" className="form__label">Message</label>
                    </div>
                    <img src={send} onClick={addMess} style={{ marginLeft: "1.5rem", width: "4vh", marginTop: "4vh", cursor: "pointer" }}></img>
                </div>

            </div>
        </div >
    );
}
export default withAuthenticator(App)
// export default App
