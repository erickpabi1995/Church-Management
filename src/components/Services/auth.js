import Api from "./api";
import axios from "axios";
import  Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"

const AUTH_TOKEN_KEY = "authToken";
const CURRENT_USER = "currentUser";
const SIGN_UP_USER = "signupUser";
const FORGOT_USER = "forgotUser";
const SET_USER_SKILL = "setUserskill";

export function loginUser(userData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Api().post("/accounts/login/", userData);
      if (res.data) {
        const user = res.data.data.user;
      
        setAuthToken(res.data.data.token.access);
        setCurrentUser(user);
        resolve(res);
      } else {
        reject(res);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function forthAttempt(userData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Api().post("/users/lock-user/", userData);
      if (res.data) {
        resolve(res);
      } else {
        reject(res);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function getUserSkill() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Api().get(
        `/users/get-user-skills/${getCurrentUser()?.user?.id}`
      );
      if (res.data) {
        resolve(res);
      } else {
        reject(res);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signUpUser(userData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Api().post("/accounts/signup/", userData);
      if (res.data) {
        setSignUpUser(res.data);
        resolve(res);
      } else {
        reject(res);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function forgotUser(userData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Api().post(
        "/users/request-user-password-reset/",
        userData
      );
      if (res.data) {
        setForgotUser(res.data);
        resolve(res);
      } else {
        reject(res);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function logoutUser() {
  clearAuthToken();
  clearCurrentUser();
  clearSignUpUser();
}

export function setAuthToken(token) {
  Cookies.set(AUTH_TOKEN_KEY, token, { domain: process.env.REACT_APP_DOMAIN});
}

export function getAuthToken() {
  return Cookies.get(AUTH_TOKEN_KEY, { domain: process.env.REACT_APP_DOMAIN});
}

export function clearAuthToken() {
  axios.defaults.headers.common.Authorization = "";
  return Cookies.remove(AUTH_TOKEN_KEY,{ domain: process.env.REACT_APP_DOMAIN});
}

export function isLoggedIn() {
  const authToken = getAuthToken();
  return !!(authToken && isTokenActive(authToken));
}
export function setCurrentUser(data) {
  Cookies.set(CURRENT_USER, JSON.stringify(data));
}
export function setForgotUser(data) {
  Cookies.set(FORGOT_USER, JSON.stringify(data));
}

export function setSignUpUser(data) {
  Cookies.set(SIGN_UP_USER, JSON.stringify(data));
}

export function setUserSkill(data) {
  Cookies.set(SET_USER_SKILL, JSON.stringify(data));
}
export function getCurrentUser() {
  const user = Cookies.get(CURRENT_USER);
  if (!user) {
    clearAuthToken();
    clearCurrentUser();
    window.location = "/";
    return null;
  } else {
    return JSON.parse(Cookies.get(CURRENT_USER));
  }
}

export function getSignUpUser() {
  const user = Cookies.get(SIGN_UP_USER);
  if (!user) return null;
  return JSON.parse(Cookies.get(SIGN_UP_USER));
}

export function getForgotUser() {
  return JSON.parse(Cookies.get(FORGOT_USER));
}

export function clearSignUpUser() {
  return Cookies.remove(SIGN_UP_USER);
}

export function clearCurrentUser() {
  return Cookies.remove(CURRENT_USER);
}
export function isSuperUser() {
  return isLoggedIn();
}
export function getUserType() {
  if (isLoggedIn()) {
    const currentUser = getCurrentUser();
    if (currentUser) {
      return currentUser.user;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function getTokenExpirationDate(encodedToken) {
  const token = jwtDecode(encodedToken);
  if (!token.exp) {
    return null;
  }
  return token.exp;
}
export function isTokenActive(token) {
  const expirationDate = getTokenExpirationDate(token);
  const now = Math.floor(Date.now() / 1000);
  return expirationDate > now;
}