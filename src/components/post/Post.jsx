import "./post.css";
import { MoreVert, CommentOutlined } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "../../hooks/axios";
import { formatDistance, formatDistanceToNowStrict } from 'date-fns'
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



//POST FUNCTION---------------------------------------
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  // post belongs to this user
  const [userPost, setUserPost] = useState({});

  //logged user details
  const { user } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //fetching a user from data base with the help of post
  useEffect(() => {
    async function fetchUser() {
      const user = await axios(`/users?userId=${post.userId}`);
      setUserPost(user.data);
    }
    fetchUser();
  }, [post]);


  //setting value of isliked depending upon loggedIn already liked the post or not
  useEffect(()=>{
    setIsLiked(post.likes.includes(user._id));
  },[post.likes , user._id])


  async function likeHandler(){
    try {
      const res = await axios.put(`/posts/${post._id}/likes`, {userId : user._id})
      console.log(res);
    } catch (error) {
        console.log(error);
    }

    setLike(() => {
      if (isLiked) {
        return like - 1
      
      }else return like + 1;
    });
    setIsLiked(!isLiked);
  }



  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${userPost.username}`} >
              <img
                src={userPost.profilePicture ? userPost.profilePicture : `${PF}/person/noAvatar.png`}
                className="PostProfileImage"
                alt=""
              />
              </Link>
              <Link to={`/profile/${userPost.username}`} style={{ textDecoration : "none",
                alignItems : "center",
                justifyContent : "center" }} >
               <span className="postUsername">{userPost.username}</span>
              </Link>
              
            
            <span className="postDate">{formatDistanceToNowStrict(new Date(post.createdAt))}</span>
          </div>

          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={`${post?.img}`} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon heart "
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <CommentOutlined />
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// format(post.createdAt)
//formatDistance(new Date(post.createdAt), new Date(Date.now()))