// actions.js
export const toggleVendor = (vendorId, isverify) => ({
    type: 'TOGGLE_VENDOR',
    payload: { vendorId, isverify },
    
  });
  // actions.js
export const toggleCategory = (categoryId, isActive) => ({
    type: 'TOGGLE_CATEGORY',
    payload: { categoryId, isActive },
  });

  export const toggleUser = (userId, isActive) => ({
    type: 'TOGGLE_USER',
    payload: { userId, isActive },
  });

  export const toggleHotel = (hotelId, isActive) => ({
    type: 'TOGGLE_HOTEL',
    payload: { hotelId, isActive },
  });

  export const toggleSupport = (supportId, isActive) => ({
    type: 'TOGGLE_SUPPORT',
    payload: { supportId, isActive },
  });