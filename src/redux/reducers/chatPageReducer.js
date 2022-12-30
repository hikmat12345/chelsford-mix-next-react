import { ChatActions } from "../actions/chatActions";
const _v = sessionStorage.getItem("v-itm")
  ? JSON.parse(sessionStorage.getItem("v-itm"))
  : {};
const initialState = {
  conversationId: _v.conversationId,
  visitor: _v,
  messages: [],
  selected: null,
  conversations: [],
};

const chatSupportPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ChatActions.SET_VISITOR:
      return { ...state, visitor: payload };
    case ChatActions.SET_CONVERSATION_ID:
      return {
        ...state,
        conversationId: payload,
      };
    case ChatActions.SET_MESSAGES:
      return { ...state, messages: payload };
    case ChatActions.NEW_ADMIN_MESSAGE: 
      return {
        ...state,
        messages: state.messages.some((message) => message._id === payload._id)
          ? [...state.messages]
          : [...state.messages, payload],
      };
    case ChatActions.SET_CONVERSATIONS_LIST:
      return {
        ...state,
        conversations: payload,
      };
    case ChatActions.ADD_NEW_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.some(
          (con) => con.conversationId === payload.conversationId,
        )
          ? [...state.conversations]
          : [...state.conversations, payload],
      };
    case ChatActions.SELECT_CONVERSATION:
      return {
        ...state,
        selected: state.conversations.find(
          (con) => con.conversationId === payload,
        ),
      };
    case ChatActions.SEEN_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.conversationId === payload ? { ...msg, status: 1 } : { ...msg },
        ),
      };
    default:
      return state;
  }
};

export default chatSupportPageReducer;
