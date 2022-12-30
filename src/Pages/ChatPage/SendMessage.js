const baseUrl = process.env.REACT_APP_MESSAGING_SERVICE_BASE_URL;

const paths = {
  sendMessage: `${baseUrl}/api/message/send/visitor`,
  getMessages: `${baseUrl}/api/message/get`,
  sendToProvider: `${baseUrl}/api/message/send/to/provider`,
  markMessageSeen: `${baseUrl}/api/message/expert/mark/seen`,
  getAllConversations: `${baseUrl}/api/conversation/get/by/customer`,
};

export const sendMessage = (data) => { 
  return fetch(paths.sendMessage, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getAllMessages = (conversationId) => {
  return fetch(paths.getMessages + "/" + conversationId, {
    method: "GET",
  }).then((res) => res.json());
};

export const sendMessageToProvider = (data) => {
  return fetch(paths.sendToProvider, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const markMessageSeen = (conversationId, from) => {
  return fetch(
    `${paths.markMessageSeen}?conversationId=${conversationId}&from=${from}`,
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getAllConversations = (customerId) => {
  return fetch(`${paths.getAllConversations}/` + customerId).then((res) =>
    res.json(),
  );
};

// get all conversations
