import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  addToCart:[]
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
        if (existingItemIndex !== -1) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
          state.items[existingItemIndex].productVariant.quantity += 1;
        } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ hàng
          state.items.push(newItem);
        }
      },

      updateCart(state, action) {
        const updatedItems = action.payload;
        state.items = updatedItems;
      },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart,updateCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;   