/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { getFileSrcFromPublicFolder } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import EventBus from "../../helpers/eventBus";
import { ChatActions } from "../../redux/actions/chatActions";
import { getAllMessages, markMessageSeen, sendMessage } from "./SendMessage";

const AttachmentSvg = getFileSrcFromPublicFolder("attachement.svg");
const SendSvg = getFileSrcFromPublicFolder("send.svg");

export const ChatBox = ({}) => {
  const [message, setmessage] = useState("");
  const { messages, conversationId, visitor } = useSelector(
    (state) => state.chatSupportPageReducer,
  );

  const dispatch = useDispatch();
  const chatBodyRef = useRef();

  useEffect(() => {
    // set if possible visitor in store state.
    setVisitor();

    // hide chat widget
    setTimeout(() => {
      let w = document.getElementById("chat-box-icon");
      if (w) w.style.display = "none";
    }, 2000);
    getMessages();
    // disabling widget socket connections.
    EventBus.on("v-join-ack", (data) => { 
      dispatch({ type: ChatActions.SET_VISITOR, payload: data.detail });
    });

    EventBus.on("admin-message", (data) => {
      scrollToBottom();
      dispatch({
        type: ChatActions.NEW_ADMIN_MESSAGE,
        payload: data.detail,
      });
    });
    EventBus.on("message-seen", (data) => { 
      dispatch({
        type: ChatActions.SEEN_MESSAGE,
        payload: data.detail.data,
      });
    });
    return () => {
      let w = document.getElementById("chat-box-icon");
      if (w) w.style.display = "block";
    };
  }, []);

  const handleMessageSubmit = () => {
    if (!message.trim()) return;
    if (!visitor) return; 
    sendMessage({
      fromId: visitor.userName,
      conversationId,
      text: message,
      adminToken: getAdminToken(),
      host: "expert-dev.findanexpert.net",
    })
      .then((data) => { 
        if (!conversationId) {
          dispatch({
            type: ChatActions.SET_CONVERSATION_ID,
            payload: data.conversation.conversationId,
          });
          setmessage("");
          let vt = sessionStorage.getItem("v-itm");
          if (vt) {
            vt = JSON.parse(vt);
            sessionStorage.setItem(
              "v-itm",
              JSON.stringify({
                ...vt,
                conversationId: data.data.conversationId,
              }),
            );
          }
        }
        dispatch({
          type: ChatActions.NEW_ADMIN_MESSAGE,
          payload: data.data,
        });
        scrollToBottom();
        setmessage("");
      })
      .catch((err) => console.log(err));
  };

  const getMessages = () => {
    if (!conversationId) return;
    getAllMessages(conversationId)
      .then((res) => {
        dispatch({ type: ChatActions.SET_MESSAGES, payload: res.data });
        scrollToBottom();
      })
      .catch((err) => console.log(err));
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatBodyRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 300);
  };

  const setVisitor = () => {
    if (visitor.userName) { 
      return;
    }
    if (!visitor.userName) { 
      if (!!sessionStorage.getItem("v-itm")) { 
        let v = JSON.parse(sessionStorage.getItem("v-itm")); 
        dispatch({ type: ChatActions.SET_VISITOR, payload: v });
      } else {
        // set visitor
      }
    }
  };

  const handleMessageSeen = () => {
    try {
      if (messages.length === 0) return;
      let lastMessage = messages[messages.length - 1];
      if (lastMessage.from === visitor.userName) return;
      markMessageSeen(lastMessage.conversationId, lastMessage.from);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fae-chat-page-container">
        <div className="chat-card">
          <div className="card-header flex-column">
            <p>Welcome To Live Chat</p>
            <p>
              <span className="bg-dark"> How can we help you ? </span>
            </p>
            <ProfileAvatar
              profile={{ name: "Admin", userName: "adminSuper" }}
            />
          </div>
          <div className="card-body">
            {messages.length > 0 &&
              messages.map((msg) =>
                msg.from && msg.from === visitor.userName ? (
                  <SenderMessage message={msg.text} isSeen={msg.status === 1} />
                ) : (
                  <ReceiverMessage message={msg.text} />
                ),
              )}
            <div ref={chatBodyRef}></div>
          </div>
          <div className="card-footer">
            <input
              placeholder="Type message ..."
              type="text"
              className="form-control"
              value={message}
              onFocus={(e) => handleMessageSeen()}
              onKeyPress={(e) => {
                if (e.charCode === 13) {
                  handleMessageSubmit();
                }
              }}
              onChange={(e) => setmessage(e.target.value)}
            />
            <div className="buttons-group">
              <span className="mr-auto icon-attachment">
                <img src={AttachmentSvg} alt="attachment" />
              </span>
              <span
                className="ml-auto icon-send"
                onClick={(e) => handleMessageSubmit(e)}
              >
                <img src={SendSvg} alt="send icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const SenderMessage = ({ message = "hi", isSeen = false }) => {
  return (
    <>
      <div className="message d-flex flex-column">
        <div>
          <div className="sender">{message}-9</div>
        </div>
        {isSeen && <span className="badge-seen ml-auto">SEEN</span>}
      </div>
    </>
  );
};

export const ReceiverMessage = ({ message = "hi" }) => {
  return (
    <>
      <div className="message">
        <div className="receiver">{message}</div>
      </div>
    </>
  );
};

export const createVisitor = ({}) => {};

export const ProfileAvatar = ({ profile }) => {
  return (
    <div class="profile-avatar d-flex">
      <div class="img">
        <span className="active_status_indicator"></span>
        <img
          src="https://png.pngtree.com/png-vector/20200614/ourlarge/pngtree-businessman-user-avatar-character-vector-illustration-png-image_2242909.jpg"
          alt=""
        />
      </div>
      <div class="username">
        <p className="name">{profile.name}</p>
        <p className="active_label">Online</p>
      </div>
    </div>
  );
};

export const getAdminToken = () => {
  let longtoken = document
    .getElementById("widget")
    .getAttribute("src")
    .split("?")[1];
  longtoken = longtoken?.replace("cd=", "");
  var adToken = longtoken.split("||")[0]; 
  return adToken;
};
