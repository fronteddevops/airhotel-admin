/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import constant from "../constant"

import api from "src/api";


export default {
  GET_ROOMS: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL +   api.rooms.GET_ROOMS(query)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  ADD_ROOMS: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(constant.BASE_URL + api.rooms.ADD_ROOMS(), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_ROOMS: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.rooms.UPDATE_ROOMS(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  DELETE_ROOMS: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.delete(constant.BASE_URL + api.rooms.DELETE_ROOMS(query));
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}