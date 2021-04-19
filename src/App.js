import React, { useState } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';

import menus from "./logo/menu.png"
import arrow from "./logo/left-arrow.png"
import user from "./logo/user.png"

import './App.css';

const { Title } = Typography;


function App() {
    const [side, setSide] = useState(true);
    const [sideContent, setSideContent] = useState("20%");
    const [sideVisibiliy, setSideVisibiliy] = useState(6);
    const [buttonVis, setbuttonVis] = useState("none");
    const [conversations, setConv] = useState(["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", "user11", "user12"]);
    const [AllMess, setMessage] = useState([{ user: 1, message: "Hello there" }, { user: 1, message: "How are you?" }, { user: 0, message: "Fine thx" }, { user: 0, message: "and you ?" }, { user: 0, message: "yup" }])

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

    function addConv() {
        setConv(state => [...state, "Oui"]);
    }
    function addMess(e) {
        if (e.key === 'Enter') {
            setMessage(state => [...state, { user: 0, message: e.target.value }]);
        }
    }

    function Convs(conv) {
        return conv.map((elem, index) => {
            return (
                <li className="liUser" key={index}>
                    <figure className="userFigure">
                        <img className="userImg" src={user}></img>
                    </figure>
                    <div>
                        <Title style={{ color: "white" }} level={5}>{elem}</Title>
                        <h5></h5>

                        <p className="pUser" style={{ maxWidth: "100%" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </li>
            )
        })
    }

    function messages(mess) {
        return mess.map((elem, index) => {
            if (elem.user == 1) {
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

                <Row>
                    <Col xs={2} className="one">
                        {/* <button onClick={() => tests()}></button> */}
                        <img src={menus} onClick={changeSide} style={{ width: "3vh", marginTop: "1vh", float: "left", marginLeft: "1.5vh", display: buttonVis }}></img>

                    </Col>

                    <Col style={{ position: "relative" }} xs={sideVisibiliy} className="two">

                        <div className="ulTop">
                            <Title style={{ marginTop: "1vh", float: "left", marginLeft: "5vh", color: "white" }} level={3}>Chats</Title>
                            <h3 ></h3>

                            <img src={arrow} onClick={changeSide} style={{ float: "right", width: "3vh", marginTop: "1vh" }}></img>
                        </div>


                        <ul className="ulUser">
                            {Convs(conversations)}
                        </ul>

                    </Col>

                    <Col flex={5} className="three">

                        <div style={{ height: "200vh" }}>
                            {messages(AllMess)}
                        </div>

                    </Col>
                </Row>
                <div className="footerMess">
                    <div className="form__group field">
                        <input autoComplete="off" onKeyDown={addMess} type="input" className="form__field" placeholder="Msg" name="msg" id='msg' required />
                        <label htmlFor="name" className="form__label">Message</label>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default App;
