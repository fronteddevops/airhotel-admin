/* eslint-disable import/no-anonymous-default-export */
export default {
    // GET_BOOKING: () => "/booking/",
    GET_BOOKING: (query) => `/booking/${query}`,

    UPDATE_BOOKING: (query) => `/editbooking/${query}`,
   

};