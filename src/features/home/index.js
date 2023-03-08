import React from "react";

import TagList from "./TagList"
import Pagination from "../../components/Pagination"
import ArticleList from "./ArticleList"
import FeedTab from "./FeedTab"


function Home() {
  return (
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>a place to share your knowledge.</p>
        </div>
      </div>
      <FeedTab />
      <div class="container page">
        <div class="row">
          <div class="col-md-9">

            <ArticleList />

            <Pagination />

          </div>

          <TagList />

        </div>
      </div>
    </div>
  )
}
export default Home
