/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import constant from "../constant";

import api from "src/api";

export default {
  GET_CATEGORY: (query) => {
    return new Promise(async (resolve, reject) => {
    
      try {
        
        const response = await Axios.get(constant.BASE_URL + api.category.GET_CATEGORY(query));
      
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  ADD_CATEGORY: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.category.ADD_CATEGORY(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_CATEGORY: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.category.UPDATE_CATEGORY(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_CATEGORY: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(constant.BASE_URL + api.category.DELETE_CATEGORY(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_CATEGORY_BY_ID: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(constant.BASE_URL + api.category.GET_CATEGORY_BY_ID(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPLOAD_IMAGE: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.category.UPLOAD_IMAGE(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
