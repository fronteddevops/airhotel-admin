/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_VENDOR: () => "/vendor/",
    GET_VENDOR_BY_ID: (query) => `/auth/${query}`,
    ADD_VENDOR: () => `/auth/user/`,
    UPDATE_VENDOR: (query) => `/auth/userUpdateByAdmin/${query}`,
    DELETE_VENDOR: (query) => `/deletevendor/${query}`,

};