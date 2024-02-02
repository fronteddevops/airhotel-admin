/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_CATEGORY: () => "/category/",
    ADD_CATEGORY: () => "/category/createcategory",
    UPDATE_CATEGORY : (query) => `/category/${query}`,
    DELETE_CATEGORY:(query)=> `/category/${query}`,
    GET_CATEGORY_BY_ID: (query) => `/category/${query}`,
    UPLOAD_IMAGE:()=>`/auth/documentImage`,
    

};