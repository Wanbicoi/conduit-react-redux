import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../auth/authSlice'
import { changeTab, changeTag } from './homeSlice'
function FeedTab() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const tag = useSelector(state => state.home.tag)
  const selectedTab = useSelector(state => state.home.selectedTab)
  const dispatch = useDispatch()
  return (
    <>
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          {isAuthenticated &&
            <li class="nav-item">
              <button class={selectedTab === 'your' ? "nav-link active" : "nav-link"}
                onClick={() => { dispatch(changeTab('your')); dispatch(changeTag('')); }}>Your Feed</button>
            </li>
          }
          <li class="nav-item">
            <button class={selectedTab === 'global' ? "nav-link active" : "nav-link"}
              onClick={() => { dispatch(changeTab('global')); dispatch(changeTag('')); }} >Global Feed</button>
          </li>
          {tag &&
            <li class="nav-item">
              <button class={selectedTab === 'tag' ? "nav-link active" : "nav-link"}
                onClick={() => { dispatch(changeTab('tag')) }} >{'#' + tag}</button>
            </li>
          }
        </ul>
      </div>
    </>
  )
}
export default FeedTab
