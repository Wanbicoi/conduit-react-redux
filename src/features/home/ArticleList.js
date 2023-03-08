import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectArticlesStatus, selectArticles, getGlobalArticles } from "./homeSlice";
import { Status } from "../../common/utils"
import TabBar from "../../components/TagBar"
import { Link } from "react-router-dom";
function ArticleList() {
  const articles = useSelector(selectArticles)
  const articlesStatus = useSelector(selectArticlesStatus)
  const tag = useSelector((state) => state.home.tag)
  const selectedTab = useSelector((state) => state.home.selectedTab)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchTags = dispatch(getGlobalArticles())
    return () => {
      fetchTags.abort();
    }
  }, [tag, selectedTab])
  if (articlesStatus === Status.LOADING)
    return (<p>Loading...</p>)
  else if (Object.keys(articles).length === 0)
    return (<p>No article yet!</p>)
  else
    return (
      <>
        {articles.map(article => (
          <div class="article-preview" key={article.slug}>
            <div class="article-meta">
              <a href={article.author.image}><img src={article.author.image} /></a>
              <div class="info">
                <a href="" class="author">{article.author.username}</a>
                {/* <span class="date">January 20th</span> */}
                <time className="date" dateTime={article.createdAt}>
                  {new Date(article.createdAt).toDateString()}
                </time>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {article.favoritesCount}
              </button>
            </div>
            <Link to={`/article/${article.slug}`} class="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
            </Link>
            <div>
              <TabBar tags={article.tagList} />
            </div>
          </div>
        ))}
      </>
    )
}
export default ArticleList
