/* eslint-disable import/no-anonymous-default-export */
export default {
    // GET_HOTEL: () => "/hotel/",
    GET_HOTEL: (query) => `/hotel/?${query}`,

    ADD_HOTEL: () => "/hotel/hotels",
    UPDATE_HOTEL: (query) => `/hotel/${query}`,
    // GET_HOTEL_BY_ID: (query) => `/hotel/${query}`,
    GET_HOTEL_BY_ID: (id) => `/hotel/${id}`,

    DELETE_HOTEL: (query) => `/hotel/deletehotels/${query}`,
    UPLOAD_MULTIPLE_IMAGE:()=>`/auth/images`
    
};