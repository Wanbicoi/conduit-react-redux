import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Status } from "../../common/utils"
import agent from "../../common/agent"
const initialState = {
  // selected tag
  tag: undefined,
  selectedTab: 'global', // your - global - tag

  tagsStatus: Status.IDLE,
  tags: [],
  articlesStatus: Status.IDLE,
  articles: [],
  articlesCount: 0,
  articlesPerPage: 10,
}
export const getGlobalTags = createAsyncThunk('tags/getGlobalTags', async () => await agent.Home.getGlobalTags())
export const getGlobalArticles = createAsyncThunk('articles/getGlobalArticles', async (_, { getState }) => {
  const { articles, articlesCount } = await agent.Home.getGlobalArticles({ tag: getState().home.tag, limit: 10, offset: 5 })
  return { articles, articlesCount }
})
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    selectTag: (state, action) => { state.tag = action.payload },
    changeTab: (state, action) => { state.selectedTab = action.payload },
    changeTag: (state, action) => { state.tag = action.payload }
  },
  extraReducers(builder) {
    builder
      .addCase(getGlobalTags.fulfilled, (state, action) => {
        state.tagsStatus = Status.SUCCESS
        state.tags = action.payload.tags
      })
      .addCase(getGlobalTags.pending, (state) => {
        state.tagsStatus = Status.LOADING
      })
      .addCase(getGlobalArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.articlesStatus = Status.SUCCESS
      })
      .addCase(getGlobalArticles.pending, (state) => {
        state.articlesStatus = Status.LOADING
      })
  }
})
const selectHomeSlice = (state) => state.home
export const selectTagsLoading = (state) => selectHomeSlice(state).tagsStatus
export const selectGlobalTags = (state) => selectHomeSlice(state).tags

export const selectArticles = (state) => selectHomeSlice(state).articles
export const selectArticlesStatus = (state) => selectHomeSlice(state).articlesStatus

export const { selectTag, changeTab, changeTag } = homeSlice.actions
export default homeSlice.reducer
