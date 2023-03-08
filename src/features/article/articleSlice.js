import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../common/agent";
export const getArticle = createAsyncThunk("article/getArticle", async (slug) => agent.Article.getArticle(slug))
const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: {}
  },
  reducers: [],
  extraReducers(builder) {
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.article = action.payload.article
    })
  },
})
export default articleSlice.reducer
