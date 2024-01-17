/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import Constant from "../Constant";

import api from "src/api";


export default {
    GET_RATINGS: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         api.ratings.GET_RATINGS()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}