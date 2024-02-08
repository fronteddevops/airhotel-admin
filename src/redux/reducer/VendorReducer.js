const initialState = {
    vendors: [],
  };
  
  const vendorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_VENDOR':
        return {
          ...state,
          vendors: state.vendors.map(vendor =>
            vendor.id === action.payload.vendorId
              ? { ...vendor, isActive: action.payload.isverify }
              : vendor
          ),
        };
      default:
        return state;
    }
  };
  
  export default vendorReducer;