/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_SUPPORT: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL +   api.support.GET_SUPPORT(query)
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
  },
  UPDATE_SUPPORT_BY_ID: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.support.UPDATE_SUPPORT_BY_ID(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}