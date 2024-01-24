/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_COUPON: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL + api.coupon.GET_COUPON()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  ADD_COUPON: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.coupon.ADD_COUPON(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_COUPON: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.coupon.UPDATE_COUPON(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_COUPON: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(constant.BASE_URL + api.coupon.DELETE_COUPON(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}