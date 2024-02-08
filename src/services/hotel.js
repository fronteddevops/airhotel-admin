/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";


import api from "src/api";
import constant from "../constant"


export default {
    GET_HOTEL: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         constant.BASE_URL + api.hotel.GET_HOTEL(query)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_HOTEL_BY_ID: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         constant.BASE_URL + api.hotel.GET_HOTEL_BY_ID(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  ADD_HOTEL: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.post(
         constant.BASE_URL + api.hotel.ADD_HOTEL(),data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_HOTEL: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.hotel.UPDATE_HOTEL(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_HOTEL: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(constant.BASE_URL + api.hotel.DELETE_HOTEL(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPLOAD_MULTIPLE_IMAGE: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.hotel.UPLOAD_MULTIPLE_IMAGE(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}