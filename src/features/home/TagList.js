import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Status } from "../../common/utils.js"

import { selectGlobalTags, selectTagsLoading, getGlobalTags, selectTag, changeTab } from "./homeSlice.js"

function TagList() {
  let tags = useSelector(selectGlobalTags)
  const isLoading = useSelector(selectTagsLoading)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchTags = dispatch(getGlobalTags())
    return () => {
      fetchTags.abort();
    }
  }, [])
  return (
    <div class="col-md-3">
      <div class="sidebar">
        <div class="tag-list">
          <p>Popular Tags</p>
          {isLoading === Status.LOADING ? (
            <p>Loading...</p>
          ) : (
            tags.map((tag) => (
              <button onClick={() => {
                dispatch(selectTag(tag))
                dispatch(changeTab('tag'))
              }} key={tag} class="tag-pill tag-default">
                {tag}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
export default TagList
