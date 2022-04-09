  export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payLoad: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Follow = (userId) => ({
    type: "FOLLOW",
    payLoad: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payLoad: userId,
  });
  
  