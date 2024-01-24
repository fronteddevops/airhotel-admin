/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_SUBSCRIPTION: () => "/subscription/",
    ADD_SUBSCRIPTION: () => "/addsubscription/",
    UPDATE_SUBSCRIPTION: (query) => `/editsubscription/${query}`,
    DELETE_SUBSCRIPTION: (query) => `/deletesubscription/${query}`,

};