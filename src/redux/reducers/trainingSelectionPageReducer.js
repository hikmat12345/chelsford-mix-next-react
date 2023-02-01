const initialState = {
  error: null,
  loading: true,
  trainingList: [],
};

const trainingSelectionPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_TRAINING_LIST_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "GET_TRAINING_LIST_DETAILS_RESPONSE":
      return {
        ...state,
        loading: false,
        trainingList: payload.statusCode !== 0 ? [] : payload.services,
      };
    case "GET_TRAINING_LIST_DETAILS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default trainingSelectionPageReducer;
