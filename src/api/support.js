/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_SUPPORT: (query) => `/Support/?${query}`,
    UPDATE_SUPPORT: (query) => `/editsupport/${query}`,
    UPDATE_SUPPORT_BY_ID: (query) => `/support/${query}`,


};