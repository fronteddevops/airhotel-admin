/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_VENDOR: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL +  api.vendor.GET_VENDOR()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  ADD_VENDOR: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.vendor.ADD_VENDOR(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_VENDOR: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.vendor.UPDATE_VENDOR(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_VENDOR: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(constant.BASE_URL + api.vendor.DELETE_VENDOR(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_VENDOR_BY_ID: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(constant.BASE_URL + api.vendor.GET_VENDOR_BY_ID(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}