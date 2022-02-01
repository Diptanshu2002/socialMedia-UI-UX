import "./post.css";
import { MoreVert, CommentOutlined } from "@material-ui/icons";


export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src="./assets/person/1.jpeg"
              className="PostProfileImage"
              alt=""
            />
            <span className="postUsername">Kirito</span>
            <span className="postDate">20 mins ago</span>
          </div>

          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">Hey Lets Marry</span>
          <img className="postImg" src="./assets/post/1.jpeg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="./assets/like.png" alt="" />
            <img className="likeIcon heart " src="./assets/heart.png" alt="" />
            <span className="postLikeCounter">32</span>
          </div>
          <div className="postBottomRight">
            <CommentOutlined />
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
