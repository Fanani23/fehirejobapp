const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    token: "",
  },
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  if (action.type === "COMPANY_REGISTER_PENDING") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "COMPANY_REGISTER_SUCCESS") {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
    };
  } else {
    return state;
  }
};

export default userReducer;
