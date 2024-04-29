const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    // Kiểm tra nếu action là một action cập nhật giỏ hàng
    if (
      action.type === 'cart/addToCart' ||
      action.type === 'cart/removeFromCart' ||
      action.type === 'cart/decreaseQuantity' ||
      action.type === 'cart/updateCart' ||
      action.type === 'cart/updateCartdata'
    ) {
      // Lưu trạng thái giỏ hàng vào local storage
      localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.items));
    }
    return result;
  };
  
  export default localStorageMiddleware;