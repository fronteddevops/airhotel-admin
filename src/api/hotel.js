/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_HOTEL: () => "/hotel/",
    ADD_HOTEL: () => "/hotel",
    UPDATE_HOTEL: (query) => `/hotel/edithotels/${query}`,
    DELETE_HOTEL: (query) => `/hotel/deletehotels/${query}`,
    
};