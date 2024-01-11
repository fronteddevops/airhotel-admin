/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import Constant from "../Constant";

import api from "src/api";


export default {
  GET_USERS: () => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         api.UserList.GET_USERS()
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
}