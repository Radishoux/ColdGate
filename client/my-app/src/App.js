import React, { useState } from 'react';
import menus from "./logo/menu.png"
import arrow from "./logo/left-arrow.png"
import user from "./logo/user.png"
import './App.css';

function Convs() {

}



function App() {
    const [side, setSide] = useState(true);
    const [sideContent, setSideContent] = useState("20%");
    const [sideVisibiliy, setSideVisibiliy] = useState("block");
    const [buttonVis, setbuttonVis] = useState("none");
    const [conversations, setConv] = useState(["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10", "user11"]);


    function changeSide() {
        console.log("e")
        if (side) {
            setSideVisibiliy("none")
            setSideContent("0%")
            setSide(false)
            setbuttonVis("block")
        } else {
            setSide(true)
            setSideVisibiliy("block")
            setSideContent("20%")
            setbuttonVis("none")
        }
    }

    function tests() {
        var tmp = conversations;
        tmp.push("Oui");
        setConv(tmp)
        console.log(conversations)
    }

    function Convs() {
        return conversations.map((elem, index) => {
            return (
                <li className="liUser" key={index}>
                    <figure className="userFigure">
                        <img className="userImg" src={user}></img>
                    </figure>
                    <div>
                        <h5>{elem}</h5>

                        <p className="pUser" style={{ maxWidth: "100%" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </li>
            )
        })
    }

    return (
        <div className="App">

            <script src="https://kit.fontawesome.com/6897908ab9.js" crossOrigin="anonymous"></script>

            <div className="outer divCentral">
                <div className="one divCentral" onClick={tests}>


                </div>

                <div style={{ width: sideContent, display: sideVisibiliy }} className="two divCentral">
                    <div className="ulTop">
                        <h3 style={{ marginTop: "1vh", float: "left", marginLeft: "5vh", }}>Chats</h3>

                        <img src={arrow} onClick={changeSide} style={{ float: "right", width: "3vh", marginTop: "1vh" }}></img>
                    </div>

                    <ul className="ulUser">
                        {Convs()}
                    </ul>

                </div>
                <div className="three divCentral">

                    <img src={menus} onClick={changeSide} style={{ width: "3vh", marginTop: "1vh", float: "left", marginLeft: "1.5vh", display: buttonVis }}></img>

                    test

                    <div style={{ height: "200vh" }}></div>

                </div>
            </div>
        </div >
    );
}

export default App;
