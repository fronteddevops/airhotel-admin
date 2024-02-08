/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_USERS: (query) => `/auth/user/?${query}`,
    // ADD_VANDOR: (query) => `/auth/user/?${query}`,
    GET_USERS_BY_ID: (id) => `/auth/${id}`,
    
};