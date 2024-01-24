/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_SUPPORT: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL +   api.support.GET_SUPPORT()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_SUPPORT: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.support.UPDATE_SUPPORT(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}