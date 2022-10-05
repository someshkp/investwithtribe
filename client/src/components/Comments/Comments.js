import React, { useEffect, useState } from 'react'
import { getComments as CommentData } from "../../Data/CommentData";
import './Comments.css'
import Comment from '../Comment/Comment'

const Comments = ({ currentUserId }) => {
    const [comments, setComments] = useState([]);
    const rootComments = comments.filter(comment => comment.parentId === null)

    useEffect(() => {
        CommentData().then((data)=>{
          setComments(data)
        })
      }, []);
  return (
    <div className="comments-container">
        {rootComments.map(rootComment => (
          <Comment key={rootComment.id} comment={rootComment}/>
        ))}
      </div>
  )
}

export default Comments