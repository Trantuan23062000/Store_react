import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].productVariant.quantity += 1;
      } else {
        state.items.push(newItem);
      }
      // Cập nhật giỏ hàng trong Local Storage sau mỗi lần thêm sản phẩm vào giỏ hàng
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.productVariant.quantity > 1) {
          existingItem.productVariant.quantity -= 1;
        } else {
          // Nếu số lượng giảm xuống 0, xoá mục khỏi giỏ hàng
          state.items.splice(existingItemIndex, 1);
        }
      }
    },

    updateCart: (state, action) => {
      const updatedItems = action.payload;
      updatedItems.forEach((updatedItem) => {
        const index = state.items.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      });
    },

    // Bạn có thể giữ lại hoặc loại bỏ reducer này tùy thuộc vào yêu cầu của bạn
     updateCartdata: (state, action) => {
       state.items = action.payload; // Cập nhật giỏ hàng với dữ liệu mới từ payload
   },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, updateCart, updateCartdata } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
