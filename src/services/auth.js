/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import constant from "../constant";
import api from "../api";
export default {

LOGIN_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.auth.LOGIN(),
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response?.data?.tokens?.access?.token) {
          sessionStorage.setItem('access_token', response.data.tokens.access.token)
        }

        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${sessionStorage.getItem("access_token")}`;
        resolve(response);
      } catch (err) {
     
        reject(err);
      }
    });
  },
  REGISTER_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.auth.REGISTER(),
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // sessionStorage.setItem(
        //   "access_token",
        //   response.data.tokens.access.token
        // );
        // sessionStorage.setItem("expires", response.data.tokens.access.expires);
        // sessionStorage.setItem("email", response.data.user.email);
        // sessionStorage.setItem("role", response.data.role);
        // sessionStorage.setItem("id", response.data.user.id);
        // sessionStorage.setItem(
        //   "user_Details",
        //   JSON.stringify(response.data.user)
        // );
       
        // Axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${sessionStorage.getItem("access_token")}`;
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  LOGOUT: (data) => {
    return new Promise(async (resolve, reject) => {
   
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.auth.LOGOUT(),
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

}