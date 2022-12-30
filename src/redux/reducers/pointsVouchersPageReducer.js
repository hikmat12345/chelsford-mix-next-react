const initialState = {
  error: null,
  loading: false,
  pointsVouchers: [],
};

const pointsVouchersPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_POINTS_VOUCHERS_REQUEST":
      return { ...state, loading: true };
    case "GET_POINTS_VOUCHERS_RESPONSE":
      return {
        ...state,
        loading: false,
        pointsVouchers:
          payload.statusCode !== 0 ? [] : payload.electronicVoucherList,
      };
    case "GET_POINTS_VOUCHERS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default pointsVouchersPageReducer;
