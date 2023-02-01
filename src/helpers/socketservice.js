import { io } from "socket.io-client";
import EventBus from "./eventBus";
import { getCookies } from "../utils";
import { customerChatActions } from "../redux/reducers/customerChatReducer";
import { handleConversations, handleNewMessage } from "../App";
import { ChatActions } from "../redux/actions/chatActions";
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
 

const SocketEventsList = {
  onConnect: "connect",
  onDisconnect: "disconnect",
};
class SocketServiceClass {
  socket = null;
  constructor() {
    this.socket = null;
  }

  init(dispatch) {
    this.socket = new io(SOCKET_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttemps: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });

    handleConversations(dispatch);

    this.socket.on("connect", (data) => {
      
      if (!getCookies("customer_details")?.id) return;
      let __data = {
        id: getCookies("customer_details")?.id,
        userName: getCookies("customer_details")?.id, // firstName + "-" + lastName,
        name: getCookies("customer_details")?.firstName + " " + getCookies("customer_details")?.lastName + "10101010",
        type: "customer",
      };
       
      this.socket.emit("join", { ...__data });
    });

    this.socket.on("disconnect", (data) => {
     
    });

    this.socket.on("v-join-ack", (data) => {
      sessionStorage.setItem("v-itm", JSON.stringify(data.data));
      EventBus.dispatch("v-join-ack", { detail: data.data });
    });

    this.socket.on("admin-message", (data) => {
      
      EventBus.dispatch("admin-message", { detail: data.data });
    });

    this.socket.on("new-conversation", (data) => {
      dispatch({
        type: customerChatActions.NEW_CONVERSATION,
        payload: data,
      });
    });

    this.socket.on("provider-message", (data) => {
      
      handleNewMessage(dispatch, data);
    });

    this.socket.on("message-seen", (data) => {
      dispatch({ type: customerChatActions.MESSAGE_SEEN, payload: data });
    });

    this.socket.on("");
  }

  setSocket(_socket) {
    this.socket = _socket;
  }

  hasSocket() {
    return !!this.socket;
  }

  emit(event, data) {
    if (!this.socket) {
      console.error("no socket data is available ...");
      return;
    }
    this.socket.emit(event, data);
  }

  listen(event, cb) {
    if (!this.socket) {
      console.error("no socket object, cannot listen ...");
      return;
    }

    this.socket.on(event, cb);
  }
}

export const SocketService = new SocketServiceClass();
