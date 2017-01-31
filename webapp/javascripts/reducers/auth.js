const AUTH_FETCH_SUCCESS = "AUTH_FETCH_SUCCESS";
const AUTH_FETCH_FAILURE = "AUTH_FETCH_FAILURE";
const AUTH_CREATE_SUCCESS = "AUTH_CREATE_SUCCESS";
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";

const auth = (variables) => {
  return {
    path: "/auth",
    type: AUTH_FETCH_SUCCESS,
  };
};

const login = (variables) => {
  return {
    config: {
      path: "/auth/login",
      method: "POST",
      multipart: true,
    },
    submit: (params) => (client) => {
      return client.post("/auth/login", params);
    },
    type: AUTH_LOGIN_SUCCESS,
  };
};

const create = (variables) => {
  return {
    config: {
      path: "/auth",
      method: "POST",
      multipart: true,
    },
    submit: (params) => (client) => {
      return client.post("/auth", params);
    },
    type: AUTH_CREATE_SUCCESS,
  };
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
  case AUTH_LOGIN_SUCCESS:
    console.log("LOGIN SUCCESS", action);
    return state;
  default:
    return state;
  }
};

export default auth;
export { create, login, reducer };
