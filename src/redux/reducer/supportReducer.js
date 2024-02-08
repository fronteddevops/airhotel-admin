const initialState = {
    supports: [],
  };
  
  const supportReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_SUPPORT':
        return {
          ...state,
          supports: state.supports.map(support =>
            user.id === action.payload.supportId
              ? { ...support, isActive: action.payload.isActive }
              : support
          ),
        };
      default:
        return state;
    }
  };
  
  export default supportReducer;