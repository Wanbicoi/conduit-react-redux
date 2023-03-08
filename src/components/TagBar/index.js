import React from "react";
function TagBar({ tags }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li className="tag-default tag-pill tag-outline" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  )
}
export default TagBar
