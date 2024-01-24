/* eslint-disable import/no-anonymous-default-export */
export default {
    GET_COUPON: () => "/coupon/",
    ADD_COUPON: () => "/addcoupon/",
    UPDATE_COUPON: (query) => `/editcoupon/${query}`,
    DELETE_COUPON: (query) => `/deletecoupon/${query}`,

};