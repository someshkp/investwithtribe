import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    comments:[{
      text:String,
      postedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
  }],
    image: String,
  },
  {
    timestamps: true
  }
);

const postModel = mongoose.model("Posts", PostSchema);
export default postModel;
