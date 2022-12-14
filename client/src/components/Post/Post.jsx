import React from 'react'
import './Post.css';
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import NotLike from '../../img/notlike.png'
import Heart from '../../img/like.png'
import { useSelector } from 'react-redux';  
import { useState } from 'react';
import { likePost } from '../../api/PostRequest';
import CommentForm from '../CommentForm/CommentForm';


const Post = ({data,id}) => {
  const {user} = useSelector(state => state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () => {
    setLiked(prev =>!prev)
    likePost(data._id,user._id)
    liked ? setLikes(prev=>prev-1) : setLikes(prev=>prev+1)
  }

  return (
    <div className='Post'>
    {data.image ? <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="post image" /> : "" }
      
      <span> {data.desc}</span>
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="like/dislike"  style={{cursor:"pointer"}} onClick={handleLike}/>
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>
      
      <span style={{color:"var(--gray)", fontSize:"12px"}}>{likes} likes</span>
      <div className="detail">
        <span><b>{data.name}</b></span>
        <CommentForm props={data._id}/>
      </div>
    </div>
  )
}

export default Post