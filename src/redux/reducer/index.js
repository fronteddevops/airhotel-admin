
import categoryReducer from './categoryReducer'
import VendorReducer from './VendorReducer'
import userReducer from './userReducer'
import HotelReducer from './hotelReducer'
import supportReducer from './supportReducer'




import { combineReducers } from "redux";

const rootReducer = combineReducers ({
    categoryReducer,
    VendorReducer,
    userReducer,
    HotelReducer,
    supportReducer,
    
    
    
})

export default rootReducer;