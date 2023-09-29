import { GET_API } from "./action-types";
const initialState = {
  server_api: "http://localhost:8000",
};

export const webReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_API:
      return { ...state };
    default:
      return state;
  }
};
