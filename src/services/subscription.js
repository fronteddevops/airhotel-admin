/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_SUBSCRIPTION: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL +   api.subscription.GET_SUBSCRIPTION()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  ADD_SUBSCRIPTION: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.subscription.ADD_SUBSCRIPTION(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_SUBSCRIPTION: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.subscription.UPDATE_SUBSCRIPTION(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_SUBSCRIPTION: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(constant.BASE_URL + api.subscription.DELETE_SUBSCRIPTION(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}