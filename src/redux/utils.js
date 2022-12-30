export const fetchAction = (action) => {
  const fetchActionTemplate = {
    type: "",
    endpoint: null,
    verb: "",
    payload: null,
    headers: {},
  };
  return {
    FETCH_ACTION: {
      ...fetchActionTemplate,
      ...action,
    },
  };
};
