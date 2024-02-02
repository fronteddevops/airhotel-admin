// reducers.js
const initialState = {
  categories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.categoryId
            ? { ...category, isActive: action.payload.isActive }
            : category
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;
