/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";

import constant from "../constant";
import api from "src/api";


export default {
    GET_PAYMENT: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
          constant.BASE_URL +  api.payment.GET_PAYMENT()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}