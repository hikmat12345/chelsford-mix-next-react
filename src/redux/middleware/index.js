export const fetchMiddleware = (store) => (next) => (action) => {
  if (action["FETCH_ACTION"]) {
    const actionInfo = action["FETCH_ACTION"];
    const {
      headers: { contentType, isBearer },
    } = actionInfo;
    next({
      type: `${actionInfo.type}_REQUEST`,
    });
    fetch(actionInfo.endpoint, {
      method: actionInfo.verb,
      headers:
        contentType === "multipart"
          ? {
              mode: "no-cors",
              Authorization: isBearer? `bearer ${process.env.REACT_APP_BEARER_TOKEN}` : `Basic ${Buffer.from(
                `${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_PASSWORD}`
              ).toString("base64")}`,
              "Access-Control-Allow-Origin": "*",
            }
          : contentType === "includeBearer"
           ? { 
              "Content-Type": "application/json",
              mode: "no-cors",
              Authorization: `bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
              "Access-Control-Allow-Origin": "*",
              ...actionInfo.headers,
            }
            :{
              "Content-Type": "application/json",
              mode: "no-cors",
              Authorization: `Basic ${Buffer.from(
                `${process.env.REACT_APP_USER_NAME}:${process.env.REACT_APP_PASSWORD}`
              ).toString("base64")}`,
              "Access-Control-Allow-Origin": "*",
              ...actionInfo.headers,
            },
      body: actionInfo.payload,
    })
      .then((response) => response.json())
      .then((json) => {
        return next({
          type: `${actionInfo.type}_RESPONSE`,
          payload: json,
        });
      })
      .catch((error) => {
        return next({
          type: `${actionInfo.type}_ERROR`,
          payload: error,
        });
      });
  } else {
    return next(action);
  }
};
