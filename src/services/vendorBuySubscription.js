/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";


import api from "src/api";


export default {
    GET_VENDORBUYSUBSCRIPTION: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         api.vedorBuySubscription.GET_VENDORBUYSUBSCRIPTION()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}