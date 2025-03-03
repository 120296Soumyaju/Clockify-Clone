import axios from "axios";
import { removeItem } from "../../Utils/localStorage";
import * as types from "./auth.actionTypes";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./auth.actionTypes";

export const signup_succ = (data) => ({
  type: SIGNUP_SUCCESS,
  payload: data,
});

export const signup_req = () => ({
  type: SIGNUP_REQUEST,
});

export const signup_fail = () => ({
  type: SIGNUP_FAILURE,
});

export const login_fail = () => ({
  type: LOGIN_FAILURE,
});

export const login_succ = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const login_req = () => ({
  type: LOGIN_REQUEST,
});

export const SignupGet = (email, password) => (dispatch) => {
  console.log(email, password);
  dispatch(signup_req());
  return axios({
    method: "post",
    url: "https://pure-cliffs-12633.herokuapp.com/signup",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      console.log(res);
      dispatch(signup_succ(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const LoginGet = (email, password) => (dispatch) => {
  console.log(email, password);
  dispatch(login_req());
  return axios({
    method: "post",
    url: "https://pure-cliffs-12633.herokuapp.com/login",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      dispatch(login_succ(res.data));
    })
    .catch((err) => {
      dispatch(login_fail());
      console.log(err);
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
  removeItem("user");
  removeItem("token");
};


export const Google_oauth =()=>(dispatch)=>{
    // console.log(email,password);
    dispatch(login_req());
    return axios({
        method:"get",
        url:"http://localhost:7000/auth/google",
    }).then((res)=>{
       console.log(res.data);
        // dispatch(login_succ(res.data));
        // localStorage.setItem('token',res.data.token);
    }).catch((err)=>{
        dispatch(login_fail());
        console.log(err);
    })
}

/*import axios from "axios";
import { removeItem } from "../../Utils/localStorage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebaseConfig"; // Ensure firebase is initialized in firebase.js
import * as types from "./auth.actionTypes";

export const login_fail = () => ({
  type: types.LOGIN_FAILURE,
});

export const login_succ = (data) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
});

export const login_req = () => ({
  type: types.LOGIN_REQUEST,
});

export const SignupGet = (email, password) => (dispatch) => {
  console.log(email, password);
  dispatch(signup_req());
  return axios({
    method: "post",
    url: "https://pure-cliffs-12633.herokuapp.com/signup",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      console.log(res);
      dispatch(signup_succ(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const LoginGet = (email, password) => (dispatch) => {
  console.log(email, password);
  dispatch(login_req());
  return axios({
    method: "post",
    url: "https://pure-cliffs-12633.herokuapp.com/login",
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      dispatch(login_succ(res.data));
    })
    .catch((err) => {
      dispatch(login_fail());
      console.log(err);
    });
};

export const logout = () => (dispatch) => {
  const auth = getAuth();
  auth.signOut().then(() => {
    dispatch({ type: types.LOGOUT });
    removeItem("user");
    removeItem("token");
  });
};

export const Google_oauth = () => async (dispatch) => {
  dispatch(login_req());
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      token: await user.getIdToken(),
    };

    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(login_succ(userData));
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    dispatch(login_fail());
  }
};*/

