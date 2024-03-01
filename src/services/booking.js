/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import constant from "../constant"

import api from "src/api";


export default {
    GET_BOOKING: (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.booking.GET_BOOKING(query)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_BOOKING: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.booking.UPDATE_BOOKING(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}