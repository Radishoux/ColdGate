(this.webpackJsonpcoldgate=this.webpackJsonpcoldgate||[]).push([[0],{206:function(A,e,t){},285:function(A,e,t){var i={"./amplify-amazon-button_5.entry.js":[289,16],"./amplify-auth-fields_9.entry.js":[290,17],"./amplify-authenticator.entry.js":[291,5],"./amplify-button_3.entry.js":[292,18],"./amplify-chatbot.entry.js":[293,4],"./amplify-checkbox.entry.js":[294,19],"./amplify-confirm-sign-in_7.entry.js":[295,6],"./amplify-container.entry.js":[296,20],"./amplify-federated-buttons_2.entry.js":[297,21],"./amplify-federated-sign-in.entry.js":[298,22],"./amplify-form-field_4.entry.js":[299,23],"./amplify-greetings.entry.js":[300,24],"./amplify-icon-button.entry.js":[301,25],"./amplify-icon.entry.js":[302,7],"./amplify-link.entry.js":[303,26],"./amplify-nav_2.entry.js":[304,27],"./amplify-photo-picker.entry.js":[305,28],"./amplify-picker.entry.js":[306,29],"./amplify-radio-button_2.entry.js":[307,8],"./amplify-s3-album.entry.js":[308,9],"./amplify-s3-image-picker.entry.js":[309,10],"./amplify-s3-image.entry.js":[310,11],"./amplify-s3-text-picker.entry.js":[311,12],"./amplify-s3-text.entry.js":[312,13],"./amplify-select-mfa-type.entry.js":[313,30],"./amplify-sign-in-button.entry.js":[314,14],"./amplify-toast.entry.js":[315,31],"./amplify-tooltip.entry.js":[316,32]};function g(A){if(!t.o(i,A))return Promise.resolve().then((function(){var e=new Error("Cannot find module '"+A+"'");throw e.code="MODULE_NOT_FOUND",e}));var e=i[A],g=e[0];return t.e(e[1]).then((function(){return t(g)}))}g.keys=function(){return Object.keys(i)},g.id=285,A.exports=g},286:function(A,e,t){"use strict";t.r(e);var i=t(0),g=t.n(i),c=t(24),n=t.n(c),s=t(64),B=t(82),a=t(56),r=(t(206),t(346)),o=t(348),w=(t(207),t(343)),C=t.p+"static/media/send.37838c54.png",l=t(171),j=t.n(l),f=t(109),E=t(86),I={aws_project_region:"eu-west-2",aws_appsync_graphqlEndpoint:"https://x4qj3wflbbetvd77ouvpdt5ksy.appsync-api.eu-west-2.amazonaws.com/graphql",aws_appsync_region:"eu-west-2",aws_appsync_authenticationType:"API_KEY",aws_appsync_apiKey:"da2-aewnwkxlxbb55lsatk5rlsv6uy",aws_cognito_identity_pool_id:"eu-west-2:8262dcbb-25ae-4ea3-91ce-072dcd4d960f",aws_cognito_region:"eu-west-2",aws_user_pools_id:"eu-west-2_UBV4ei2Rb",aws_user_pools_web_client_id:"2dijqjatui0eic5qiesd7g8u2k",oauth:{}},D=t(345),Q=t(347),d=t(13);f.default.configure(I);var m,u=w.a.Title,M=j()("http://localhost:3001");E.a.currentAuthenticatedUser().then((function(A){console.log(A),console.log(A.attributes.email),m=A,M.emit("id socket",A),M.emit("histo",{with:m.attributes.email,from:0,to:10})}));var b=Object(Q.a)((function(){var A,e,t,g=Object(i.useState)(!0),c=Object(a.a)(g,2),n=c[0],w=c[1],l=Object(i.useState)(),j=Object(a.a)(l,2),f=j[0],E=j[1],I=Object(i.useState)([]),Q=Object(a.a)(I,2),b=Q[0],h=Q[1],Y=Object(i.useState)("none"),P=Object(a.a)(Y,2),O=P[0],H=P[1],x=Object(i.useState)("20%"),y=Object(a.a)(x,2),p=(y[0],y[1]),v=Object(i.useState)(6),J=Object(a.a)(v,2),k=J[0],G=J[1],U=Object(i.useState)([]),N=Object(a.a)(U,2),X=N[0],L=N[1],R=Object(i.useState)([]),q=Object(a.a)(R,2),K=q[0];function S(){n?(G(0),p("0%"),w(!1),H("block")):(w(!0),G(6),p("20%"),H("none"))}function T(){""!==document.getElementById("msg").value&&(L((function(A){return[].concat(Object(B.a)(A),[{user:0,message:document.getElementById("msg").value}])})),M.emit("chat message",{to:f,content:document.getElementById("msg").value}),setTimeout((function(){document.getElementById("msg").value=""}),100))}return q[1],Object(i.useEffect)((function(){M.on("whoco",(function(A){var e=[];for(var t in A)e.push(t);h(e)})),M.on("new msg",(function(A){alert("".concat(A.from,": ").concat(A.content)),E(),E(A.from)})),M.on("histoto",(function(A){console.log(A),L((function(e){return[].concat(Object(B.a)(e),Object(B.a)(A.msgs.map((function(A){return{user:1,message:A.body.S,when:A.when.N}}))))}))})),M.on("histofrom",(function(A){console.log(A),L((function(e){return[].concat(Object(B.a)(e),Object(B.a)(A.msgs.map((function(A){return{user:0,message:A.body.S,when:A.when.N}}))))}))})),E(m.attributes.email)}),[K]),Object(i.useEffect)((function(){L([]),M.emit("histo",{with:f,from:0,to:10}),document.title=f,console.log(f)}),[f]),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("div",{className:"outer divCentral",children:[Object(d.jsx)(D.c,{}),Object(d.jsxs)(r.a,{children:[Object(d.jsx)(o.a,{xs:2,className:"one",children:Object(d.jsx)("img",{src:"data:image/png;base64,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",onClick:S,style:{width:"3vh",marginTop:"1vh",float:"left",marginLeft:"1.5vh",display:O,cursor:"pointer"}})}),Object(d.jsxs)(o.a,{style:{position:"relative"},xs:k,className:"two",children:[Object(d.jsxs)("div",{className:"ulTop",children:[Object(d.jsx)(u,{style:{marginTop:"1vh",float:"left",marginLeft:"5vh",color:"white"},level:3,children:"Chats"}),Object(d.jsx)("h3",{}),Object(d.jsx)("img",{src:"data:image/png;base64,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",onClick:S,style:{float:"right",width:"3vh",marginTop:"1vh",cursor:"pointer"}})]}),Object(d.jsx)("ul",{id:"ulUser",className:"ulUser",children:(t=b,t.map((function(A,e){return Object(d.jsxs)("li",{className:"liUser",onClick:function(){E(A)},id:A,children:[Object(d.jsx)("figure",{className:"userFigure",children:Object(d.jsx)("img",{className:"userImg",src:"data:image/png;base64,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"})}),Object(d.jsxs)("div",{children:[Object(d.jsx)(u,{style:{color:"white",marginTop:"1rem",marginBottom:"0.7rem"},level:5,children:A}),Object(d.jsx)("p",{className:"pUser",style:{maxWidth:"100%"}})]})]},e)})))})]}),Object(d.jsx)(o.a,{flex:5,className:"three",children:Object(d.jsx)("div",{style:{padding:"10px 0"},children:(e=X,e.map((function(A,e){return 1===A.user?Object(d.jsx)("div",{className:"msgRdiv",children:Object(d.jsx)("p",{className:"msgReceiv",children:A.message})},e):Object(d.jsx)("div",{className:"msgSdiv",children:Object(d.jsx)("p",{className:"msgSend",children:A.message})},e)})))})})]}),Object(d.jsxs)("div",{className:"footerMess",children:[Object(d.jsxs)("div",{className:"form__group field",children:[Object(d.jsx)("input",(A={type:"reset",autoComplete:"off",onKeyDown:function(A){"Enter"===A.key&&T()}},Object(s.a)(A,"type","input"),Object(s.a)(A,"className","form__field"),Object(s.a)(A,"placeholder","Msg"),Object(s.a)(A,"name","msg"),Object(s.a)(A,"id","msg"),Object(s.a)(A,"required",!0),A)),Object(d.jsx)("label",{htmlFor:"name",className:"form__label",children:"Message"})]}),Object(d.jsx)("img",{src:C,onClick:T,style:{marginLeft:"1.5rem",width:"4vh",marginTop:"4vh",cursor:"pointer"}})]})]})})}));f.default.configure(I),n.a.render(Object(d.jsx)(g.a.StrictMode,{children:Object(d.jsx)(b,{})}),document.getElementById("root"))}},[[286,2,3]]]);
//# sourceMappingURL=main.9ee72254.chunk.js.map