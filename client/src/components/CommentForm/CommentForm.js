import React, { useState } from "react";
import Comments from "../Comments/Comments";  
import "./CommentForm.css";

const CommentForm = () => {
  const [addComment, setAddComment] = useState()
 
  const handleSubmit = (e) => {
    e.preventDefault();
    makeComment(addComment);
  };

  const makeComment = (text,postId) => {
    fetch('/comment',{
      method : "put",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : "Bearer" + localStorage.getItem("token")
      },
      body:JSON.stringify({
        postId,
        text
      })
    })
  }

  return (
    <>
 <div className="comment_form_container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add a comment"
          name="comment"
          value={addComment}
          onChange={(e) => {setAddComment(e.target.value)}}
        />
        <button>Post</button>
      </form>
    </div>
    <Comments/>
      

    </>
   
  );
};

export default CommentForm;
