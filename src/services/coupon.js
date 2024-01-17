/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import Constant from "../Constant";

import api from "src/api";


export default {
    GET_COUPON: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         api.coupon.GET_COUPON()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}