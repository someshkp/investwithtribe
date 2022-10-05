import postModel from "../Models/postModel.js";
import userModel from "../Models/userModel.js";
import mongoose from "mongoose";

//create new post
export const createPost = async (req, res) => {
  const newPost = new postModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("Action forbidden!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await postModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("post deleted!");
    } else {
      res.status(403).json("Action forbidden!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like/dislike of post

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(_id)) {
      await post.updateOne({ $push: { likes: _id }});
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: _id } });
      res.status(200).json("Post dislike");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get timeline post
export const getTimelinePost = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await postModel.find({ userId: userId });
    const followingPosts = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


//comment in post 
export const getComment = async (req,res)=>{
  const { _id } = req.body;
  const comment = {
    text: req.body.text,
    postedBy: _id
  }
  postModelfindByIdAndUpdate(req.body.postId,{
    $push:{comments:comment}
},{
    new:true
})
.populate("comments.postedBy","_id name")
.populate("postedBy","_id name")
.exec((err,result)=>{
    if(err){
        return res.status(422).json({error:err})
    }else{
        res.json(result)
    }
})
}

