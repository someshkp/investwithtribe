import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./ProfileCard.css";
import { logout } from "../../actions/AuthAction";

const ProfileCard = ({location}) => {

  const {user} = useSelector(state => state.authReducer.authData)
  const posts = useSelector(state => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const dispatch = useDispatch()
  const handleLogOut = ()=> {
    dispatch(logout())
  }
  
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "cover.jpg"} alt="cover" />
        <img src={user.coverPicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="profile" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
         
          <button className="button logout-button" onClick={handleLogOut}>Log Out</button>

          {location==="profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=> post.userId === user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProfileCard;
