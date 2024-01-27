/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_HOTEL: () => "/hotel/",
    ADD_HOTEL: () => "/hotel/hotels",
    UPDATE_HOTEL: (query) => `/hotel/${query}`,
    GET_HOTEL_BY_ID: (query) => `/hotel/${query}`,
    DELETE_HOTEL: (query) => `/hotel/deletehotels/${query}`,
    
};