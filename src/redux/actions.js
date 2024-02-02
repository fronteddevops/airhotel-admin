// actions.js
export const toggleCategory = (categoryId, isActive) => ({
  type: 'TOGGLE_CATEGORY',
  payload: { categoryId, isActive },
});
