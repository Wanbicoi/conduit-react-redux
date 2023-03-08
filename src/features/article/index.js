import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { isObjectEmpty } from "../../common/utils"
import { getArticle } from "./articleSlice"
function Article() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article.article)
  useEffect(() => {
    dispatch(getArticle(slug))
  }, [])
  if (isObjectEmpty(article)) return (<p>Loadding...</p>)
  return (
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{article.title}</h1>

          <div class="article-meta">
            <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div class="info">
              <a href="" class="author">{article.author.username}</a>
              <time className="date" dateTime={article.createdAt}>
                {new Date(article.createdAt).toDateString()}
              </time>
            </div>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {article.author.username} <span class="counter"></span>
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">({article.favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-md-12">
            <p>
              {article.body}
            </p>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div class="info">
              <a href="" class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>

            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
            &nbsp;
            <button class="btn btn-sm btn-outline-primary">
              <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">(29)</span>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form">
              <div class="card-block">
                <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div class="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div class="card-footer">
                <a href="" class="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                </a>
                &nbsp;
                <a href="" class="comment-author">Jacob Schmidt</a>
                <span class="date-posted">Dec 29th</span>
              </div>
            </div>

            <div class="card">
              <div class="card-block">
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <div class="card-footer">
                <a href="" class="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                </a>
                &nbsp;
                <a href="" class="comment-author">Jacob Schmidt</a>
                <span class="date-posted">Dec 29th</span>
                <span class="mod-options">
                  <i class="ion-edit"></i>
                  <i class="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Article
