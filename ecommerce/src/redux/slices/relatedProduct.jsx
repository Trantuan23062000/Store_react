import { createSlice } from "@reduxjs/toolkit";
import {relatedProduct} from "../../api/shop/relatedproduct"


export const relatedSlice = createSlice({
  name: "dataRelated",
  initialState: {
    dataRelated: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchRelatedRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRelatedSuccess: (state, action) => {
      state.loading = false;
      state.dataRelated = action.payload;
    },
    fetchRelatedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  fetchRelatedRequest,
  fetchRelatedSuccess,
  fetchRelatedFailure
  // export các reducers cho các actions khác
} = relatedSlice.actions;

export const fetchRelated = (detailId) => async (dispatch) => {
  try {
    dispatch(fetchRelatedRequest());
    const response = await relatedProduct(detailId);
    if (response && response.data && response.data.EC === 0) {
      dispatch(fetchRelatedSuccess(response.data.relatedDetails));
    } else {
      dispatch(fetchRelatedFailure("Failed to Error"));
    }
  } catch (error) {
    dispatch(fetchRelatedFailure(error.message));
  }
};

export default relatedSlice.reducer;