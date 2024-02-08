const initialState = {
    users: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_USER':
        return {
          ...state,
          users: state.users.map(user =>
            user.id === action.payload.userId
              ? { ...user, isActive: action.payload.isverify }
              : user
          ),
        };
      default:
        return state;
    }
  };
  
  export default userReducer;