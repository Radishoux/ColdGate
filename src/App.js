import './App.css';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import menus from "./logo/menu.png"
import arrow from "./logo/left-arrow.png"
import user from "./logo/user.png"
import send from "./logo/send.png"
import Socket from 'socket.io-client';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import axios from "axios"
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
Amplify.configure(awsconfig);

const { Title } = Typography;

var socket = Socket('http://localhost:3001');
var me;

Auth.currentAuthenticatedUser().then(function (u) {
    console.log(u);
    console.log(u.attributes.email);
    me = u;
    socket.emit('id socket', u);
    socket.emit('histo', {with: me.attributes.email, from: 0, to: 10});
})

function App() {
    const [side, setSide] = useState(true);
    const [talkinto, setTalkinto] = useState(me.attributes.email)
    const [conversations, setConv] = useState([]);
    const [buttonVis, setbuttonVis] = useState("none");
    const [sideContent, setSideContent] = useState("20%");
    const [sideVisibiliy, setSideVisibiliy] = useState(6);
    const [AllMess, setMessage] = useState([{ user: 1, message: "Hello there and welcome to Coldgate" }, { user: 1, message: "Please select a user to talk to" }, { user: 1, message: "←←←" }])

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
            socket.emit('chat message', { to:talkinto, content: document.getElementById("msg").value });
            document.getElementById("msg").value = "";
        }
    }

    function Convs(conv) {
        return conv.map((elem, index) => {
            return (
                <li className="liUser" onClick={() => {setTalkinto(elem)}} id={elem} key={index}>
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

    return (
        <div className="App">

            <div className="outer divCentral">
                <AmplifySignOut />
                <Row>
                    <Col xs={2} className="one">
                        {/* <button onClick={() => tests()}></button> */}
                        <img src={menus} onClick={changeSide} style={{ width: "3vh", marginTop: "1vh", float: "left", marginLeft: "1.5vh", display: buttonVis, cursor: "pointer" }}></img>

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
                        <input type="reset" autoComplete="off" onKeyDown={(e) => {if(e.key === 'Enter')addMess();}} type="input" className="form__field" placeholder="Msg" name="msg" id='msg' required />
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
