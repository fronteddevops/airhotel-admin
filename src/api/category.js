/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_CATEGORY: () => "/category/",
    ADD_CATEGORY: () => "/category/createcategory",
    UPDATE_CATEGORY : (query) => `/category/${query}`,
    DELETE_CATEGORY:(query)=> `/category/${query}`,
    GET_BY_CATEGORY: (query) => `/category/${query}`,

};