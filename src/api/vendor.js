/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_VENDOR: () => "/vendor/",
    ADD_VENDOR: () => "/addvendor/",
    UPDATE_VENDOR: (query) => `/editvendor/${query}`,
    DELETE_VENDOR: (query) => `/deletevendor/${query}`,

};