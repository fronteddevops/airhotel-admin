/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_RATINGS: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL + api.ratings.GET_RATINGS()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  UPDATE_RATINGS: (query,data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.put(constant.BASE_URL + api.ratings.UPDATE_RATINGS(query), data);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}