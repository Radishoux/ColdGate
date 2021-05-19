import './App.css';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import user from "./logo/user.png"
import send from "./logo/send.png"
import Socket from 'socket.io-client';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
Amplify.configure(awsconfig);

const { Title } = Typography;

var socket = Socket('http://localhost:3001');
// var socket = Socket('http://3.8.175.248:3001');
var me;

Auth.currentAuthenticatedUser().then(function (u) {
    me = u;
    socket.emit('id socket', u);
    socket.emit('histo', { with: me.attributes.email, from: 0, to: 10 });
})

function App() {
    // const [side, setSide] = useState(true);
    const [talkinto, setTalkinto] = useState()
    const [conversations, setConv] = useState([]);
    // const [buttonVis, setbuttonVis] = useState("none");
    // const [sideContent, setSideContent] = useState("20%");
    // const [sideVisibiliy, setSideVisibiliy] = useState(6);
    const [AllMess, setMessage] = useState([]);
    const [cheat] = useState([]);
    const [charnum, setCharnum] = useState(0)

    useEffect(() => {
        socket.on("whoco", colist => {
            var tmpconvs = [];
            for (var co in colist) tmpconvs.push(co);
            setConv(tmpconvs);
        })

        socket.on("new msg", msg => {
            alert(`${msg.from}: ${msg.content}`);
            setTalkinto();
            setTalkinto(msg.from);
        })

        socket.on("histoto", histomsgs => {
            setMessage(Allmess => [...Allmess, ...histomsgs.msgs.map((m) => {
                return { user: 1, message: m.body.S, when: m.when.N }
            })])
        })

        socket.on("histofrom", histomsgs => {
            setMessage(Allmess => [...Allmess, ...histomsgs.msgs.map((m) => {
                return { user: 0, message: m.body.S, when: m.when.N }
            })])
        })

        setTalkinto(me.attributes.email);
    }, [cheat])

    useEffect(() => {
        setMessage([]);
        socket.emit('histo', { with: talkinto, from: 0, to: 10 });
        document.title = talkinto;
    }, [talkinto])


    // function changeSide() {
    //     if (side) {
    //         setSideVisibiliy(0)
    //         setSideContent("0%")
    //         setSide(false)
    //         setbuttonVis("block")
    //     } else {
    //         setSide(true)
    //         setSideVisibiliy(6)
    //         setSideContent("20%")
    //         setbuttonVis("none")
    //     }
    // }

    function addMess() {
        if (document.getElementById("msg").value !== "") {
            setMessage(state => [...state, { user: 0, message: document.getElementById("msg").value }]);
            socket.emit('chat message', { to: talkinto, content: document.getElementById("msg").value });
            setTimeout(function () { document.getElementById("msg").value = "" }, 100);
            setCharnum(0);
        }
    }

    function Convs(conv) {
        return conv.map((elem, index) => {
            return (
                <li className="liUser" onClick={() => { setTalkinto(elem) }} id={elem} key={index}>
                    <figure className="userFigure">
                        <img className="userImg" alt="" src={user}></img>
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
                        {/* <img src={menus} onClick={changeSide} style={{ width: "3vh", marginTop: "1vh", float: "left", marginLeft: "1.5vh", display: buttonVis, cursor: "pointer" }}></img> */}

                    </Col>

                    <Col style={{ position: "relative" }}  className="two">

                        <div className="ulTop">
                            <Title style={{ marginTop: "1vh", float: "left", marginLeft: "5vh", color: "white" }} level={3}>Chats</Title>
                            <h3 > </h3>

                            {/* <img src={arrow} onClick={changeSide} style={{ float: "right", width: "3vh", marginTop: "1vh", cursor: "pointer" }}></img> */}
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
                        <input maxlength="49" autoComplete="off" onKeyDown={(e) => { setCharnum(document.getElementById("msg").value.length+1); if (e.key === 'Enter') addMess(); }} type="input" className="form__field" placeholder="Msg" name="msg" id='msg' required />
                        <label htmlFor="name" className="form__label">Message {charnum}/50</label>
                    </div>
                    <img alt="" src={send} onClick={addMess} style={{ marginLeft: "1.5rem", width: "4vh", marginTop: "4vh", cursor: "pointer" }}></img>
                </div>

            </div>
        </div >
    );
}

export default withAuthenticator(App)
// export default App
