const initialState = {
    hotels: [],
  };
  
  const hotelReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_HOTEL':
        
        return {
          ...state,
          hotels: state.hotels.map(hotel =>
            hotel.id === action.payload.hotelId
              ? { ...hotel, isActive: action.payload.isActive }
              : hotel
          ),
        };
      default:
        return state;
    }
  };
  
  export default hotelReducer;