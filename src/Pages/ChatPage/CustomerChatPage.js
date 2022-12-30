/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { getCookies, getFileSrcFromPublicFolder } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import EventBus from "../../helpers/eventBus";
import { ChatActions } from "../../redux/actions/chatActions";
import {
  getAllMessages,
  sendMessage,
  sendMessageToProvider,
  markMessageSeen,
} from "./SendMessage";
import { customerChatActions } from "../../redux/reducers/customerChatReducer";

const AttachmentSvg = getFileSrcFromPublicFolder("attachement.svg");
const SendSvg = getFileSrcFromPublicFolder("send.svg");

const CustomerChatBox = (props) => {
  const { state } = props.location;
  const [message, setmessage] = useState("");
  const { id } = getCookies("customer_details");
  const messages = useSelector((_state) =>
    _state.customerChatReducer.messages.filter(
      (msg) =>
        !!state.conversation &&
        !!state?.conversation?.conversationId &&
        msg.conversationId == state?.conversation?.conversationId,
    ),
  );
  
  const dispatch = useDispatch();
  const chatBodyRef = useRef();

  useEffect(() => {
    // set if possible visitor in store state.
 
    // hide chat widget
    getMessages();

    return () => {};
  }, []);
  const handleMessageSubmit = () => {
    if (!message.trim()) return;
    setmessage("");
    sendMessageToProvider({
      customerId: id,
      conversationId: state.conversation.conversationId,
      text: message,
      providerId: state.providerId, // it is hard coded to test chat
    })
      .then((data) => { 
        dispatch({
          type: customerChatActions.NEW_MESSAGE,
          payload: data.data,
        });
        scrollToBottom();
      })
      .catch((err) => console.log(err));
  };

  const getMessages = () => {
    if (!state?.conversation && state?.conversationId) return;
    getAllMessages(state?.conversation?.conversationId)
      .then((res) => {
        dispatch({
          type: customerChatActions.SET_MESSAGES_LIST,
          payload: res.data,
        });
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

  const markSeen = () => {
    if (!state?.conversation && !state?.conversation?.conversationId) return;
    let lastMessage = messages[messages.length - 1];
    if (lastMessage.from == id || lastMessage.status === 1) return;
    markMessageSeen(lastMessage?.conversationId, lastMessage.from).then((res) =>
      dispatch({
        type: customerChatActions.CLEAR_COUNTS,
        payload: lastMessage?.conversationId,
      }),
    );
  };

  return (
    <>
      <div className="fae-chat-page-container">
        <div className="chat-card">
          <div className="card-header flex-column">
            <p>
              {state?.serviceTypeName} <i className="fa fa-arrow-right"></i>{" "}
              {state?.providerName}
            </p>
          </div>
          <div className="card-body">
            {messages &&
              messages.length > 0 &&
              messages.map((msg, index) =>
                msg.from && msg.from != id ? (
                  <SenderMessage message={msg.text} status={msg.status} />
                ) : (
                  <ReceiverMessage message={msg.text} status={msg.status} />
                ),
              )}
            <div ref={chatBodyRef}></div>
          </div>
          <div className="card-footer">
            <input
              onFocus={() => markSeen()}
              placeholder="Type message ..."
              type="text"
              className="form-control"
              value={message}
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

export const SenderMessage = ({ message = "hi", status = 0 }) => {
  return (
    <>
      <div className="message">
        <div className="sender">{message}</div>
      </div>
    </>
  );
};

export const ReceiverMessage = ({ message = "hi", status = 0 }) => {
  return (
    <>
      <div className="message d-flex flex-column">
        <div>
          <div className="receiver">{message}</div>
        </div>
        {status === 1 ? (
          <span className="badge-seen badge-secondary pull-right">SEEN</span>
        ) : (
          ""
        )}
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

export default CustomerChatBox;
