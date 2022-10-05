import React from 'react'

const Comment = ({comment}) => {
  return (
    <div className="comment">
        <div className="comment-img-container">
            <img src="" alt="" />
        </div>
        <div className="comment-right-part">
            <div className="comment-content">
                <div className="comment-auther">{comment.username}</div>
            </div>
            <div className="comment-text">{comment.body}</div>
        </div>
    </div>
  )
}

export default Comment