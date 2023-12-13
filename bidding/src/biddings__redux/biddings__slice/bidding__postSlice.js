import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import PostServices___PostServices from "../biddings__services/biddings__postServices";

const initialState = {
  posts: [],
  is___Error: false,
  is___Success: false,
  is___Loading: false,
  message: null,
  single___Post: null,
  purchaser: null,
  total___Commission: 0,
};

///////creating new country
export const createPost___createPost = createAsyncThunk("post/create", async (formData, thunkAPI) => {
  try {
    return await PostServices___PostServices.createPost___createPost(formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//getting all country
export const getAllPost___getAllPost = createAsyncThunk("post/getAll", async (params, thunkAPI) => {
  try {
    return await PostServices___PostServices.getAllPost___getAllPost(params);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//updating the country
export const updatePost___updatePost = createAsyncThunk("post/update", async ({ id, formData }, thunkAPI) => {
  try {
    return await PostServices___PostServices.updatePost___updatePost(id, formData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//deleting the country
export const deletePost___deletePost = createAsyncThunk("post/delete", async (id, thunkAPI) => {
  try {
    return await PostServices___PostServices.deletePost___deletePost(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for getting the post by ud
export const getPostById___getPostById = createAsyncThunk("post/getById", async (id, thunkAPI) => {
  try {
    return await PostServices___PostServices.getPostById___getPostById(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for verifying the post
export const verifyPost___verifyPost = createAsyncThunk("post/verify", async ({ id, data }, thunkAPI) => {
  try {
    return await PostServices___PostServices.verifyPost___verifyPost(id, data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///funcition for getting the post by id
export const getPostByUser___getPostByUser = createAsyncThunk("post/getBuId", async (_, thunkAPI) => {
  try {
    return await PostServices___PostServices.getPostByUser___getPostByUser();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///funcition for bidding the post
export const placeBid___placeBid = createAsyncThunk("post/postbid", async ({ id, data }, thunkAPI) => {
  try {
    return await PostServices___PostServices.placeBid___placeBid(id, data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///funcition to sold the post
export const soldProduct___soldProduct = createAsyncThunk("post/sold", async ({ id, data }, thunkAPI) => {
  try {
    return await PostServices___PostServices.soldProduct___soldProduct(id, data);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///function for getting the product Purchaser
export const productPurchaser___productPurchaser = createAsyncThunk("post/getpurchaser", async (id, thunkAPI) => {
  try {
    return await PostServices___PostServices.productPurchaser___productPurchaser(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

///funcition for getting the commisssion by id
export const getTotalCommission___getTotalCommission = createAsyncThunk("post/gettotalcommission", async (_, thunkAPI) => {
  try {
    return await PostServices___PostServices.getTotalCommission___getTotalCommission();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.data || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


const Post___Slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("store Value");
    },
    RESET(state) {
      state.is___Loading = false;
      state.is___Error = false;
      state.is___Success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost___createPost.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(createPost___createPost.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.posts.push(action.payload);
        toast.success("post added successfully.");
      })
      .addCase(createPost___createPost.rejected, (state, action) => {
        state.is___Error = true;
        state.is___Loading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllPost___getAllPost.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(getAllPost___getAllPost.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Success = true;
        state.is___Error = false;
        state.posts = action.payload;
      })
      .addCase(getAllPost___getAllPost.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deletePost___deletePost.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(deletePost___deletePost.fulfilled, (state) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        toast.success("deleted successfully");
      })
      .addCase(deletePost___deletePost.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getPostById___getPostById.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(getPostById___getPostById.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        state.single___Post = action.payload;
      })
      .addCase(getPostById___getPostById.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyPost___verifyPost.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(verifyPost___verifyPost.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        toast.success("verified successfully");
      })
      .addCase(verifyPost___verifyPost.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getPostByUser___getPostByUser.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(getPostByUser___getPostByUser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        state.posts = action.payload;
      })
      .addCase(getPostByUser___getPostByUser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(placeBid___placeBid.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(placeBid___placeBid.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        toast.success("bidded successfully");
      })
      .addCase(placeBid___placeBid.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updatePost___updatePost.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(updatePost___updatePost.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        toast.success("updated successfully");
      })
      .addCase(updatePost___updatePost.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(soldProduct___soldProduct.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(soldProduct___soldProduct.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        toast.success("solded! successfully");
      })
      .addCase(soldProduct___soldProduct.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(productPurchaser___productPurchaser.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(productPurchaser___productPurchaser.fulfilled, (state, action) => {
        state.is___Loading = false;
        state.is___Error = false;
        state.is___Success = true;
        state.purchaser= action.payload
      })
      .addCase(productPurchaser___productPurchaser.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTotalCommission___getTotalCommission.pending, (state) => {
        state.is___Loading = true;
      })
      .addCase(getTotalCommission___getTotalCommission.fulfilled, (state, action) => {
        state.is___Loading = false
        state.is___Error = false
        state.is___Success = true
        state.total___Commissi = action.payload
      })
      .addCase(getTotalCommission___getTotalCommission.rejected, (state, action) => {
        state.is___Loading = false;
        state.is___Error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { CALC_STORE_VALUE, RESET } = Post___Slice.actions;
const Post___Reducer = Post___Slice.reducer;
export default Post___Reducer;
