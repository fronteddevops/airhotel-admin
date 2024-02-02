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
          localStorage.setItem('access_token', response.data.tokens.access.token)
        }

        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        resolve(response);
      } catch (err) {
     
        reject(err);
      }
    });
  },

}