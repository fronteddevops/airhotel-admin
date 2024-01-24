/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_ROOMS: () => "/rooms/",
    ADD_ROOMS: () => "/addrooms/",
    UPDATE_ROOMS: (query) => `/editrooms/${query}`,
    DELETE_ROOMS: (query) => `/deleterooms/${query}`,

};