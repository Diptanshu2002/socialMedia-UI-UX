import axios from "./hooks/axios";

export const loginCall = async (userCredentail, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredentail);
    console.log("api calls", res.data);
    dispatch({ type: "LOGIN_SUCCESS", payLoad: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payLoad: error });
  }
};
