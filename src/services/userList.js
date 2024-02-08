/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import api from "src/api";
import constant from "src/constant";


export default {
  GET_USERS: (query,data) => {
   
    return new Promise(async (resolve, reject) => {
      
      try {
        const response = await Axios.get(
          constant.BASE_URL +  api.userList.GET_USERS(query),data
        );
       
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },  GET_USERS_BY_ID: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
  
        const response = await Axios.get(
         constant.BASE_URL + api.userList.GET_USERS_BY_ID(id)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
}