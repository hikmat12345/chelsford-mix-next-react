import { ChatActions } from "../actions/chatActions";
const _v = sessionStorage.getItem("v-itm")
  ? JSON.parse(sessionStorage.getItem("v-itm"))
  : {};
const initialState = {
  messages: [],
  selected: null,
  conversations: [],
  messageIds: new Set(),
};

export const customerChatActions = {
  SET_CONVERSATION_LIST: "SET_CONVERSATION_LIST",
  SET_MESSAGES_LIST: "SET_MESSAGES_LIST",
  NEW_MESSAGE: "CUSTOMER_NEW_MESSAGE",
  SELECT_CONVERSATION: "SELECT_CONVERSATION",
  CLEAR_COUNTS: "CLEAR_COUNTS",
  MESSAGE_SEEN: "MESSAGE_SEEN",
  NEW_CONVERSATION: "NEW_CONVERSATION",
};

const customerChatReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case customerChatActions.SET_CONVERSATION_LIST: 
      return { ...state, conversations: payload };
    case customerChatActions.SET_MESSAGES_LIST: {
      let _messages = state.messages;
      let _ids = state.messageIds;
      payload.forEach((msg) => {
        if (!_ids.has(msg._id)) {
          _messages.push(msg);
          _ids.add(msg._id);
        }
      }); 
      return {
        ...state,
        conversationIds: _ids,
        messages: _messages,
      };
    }
    case customerChatActions.NEW_MESSAGE: { 
      let messages = [...state.messages];
      let ids = state.messageIds;
      if (!ids.has(payload._id)) {
        messages.push(payload);
        ids.add(payload._id);
      }
      return {
        ...state,
        messages: [...messages],
        messageIds: ids,
        conversations:
          state.selected &&
          state.selected.conversationId === payload.conversationId
            ? [...state.conversations]
            : state.conversations.map((con, index) =>
                con.conversationId === payload.conversationId
                  ? { ...con, counts: ++con.counts }
                  : { ...con },
              ),
      };
    }
    case customerChatActions.SELECT_CONVERSATION: {
      return { ...state, selected: payload };
    }
    case customerChatActions.CLEAR_COUNTS:
      return {
        ...state,
        conversations: state.conversations.map((con, index) =>
          con.conversationId === payload ? { ...con, counts: 0 } : { ...con },
        ),
      };

    case customerChatActions.MESSAGE_SEEN: 
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.conversationId === payload ? { ...msg, status: 1 } : { ...msg },
        ),
      };

    case customerChatActions.NEW_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.some(
          (con) => con.conversationId === payload.conversationId,
        )
          ? [...state.conversations]
          : [...state.conversations, payload],
      };
    default:
      return state;
  }
};

export default customerChatReducer;
