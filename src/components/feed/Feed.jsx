import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import { useState, useEffect } from "react";
import axios from "../../hooks/axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  
  const [posts, setPosts] = useState([]);
  const { user }= useContext(AuthContext);
  //fetching data from data base
  useEffect(() => {
    const fetchPosts = async()=> {
        let res = []
        if(username){
           res = await axios.get(`/posts/profile/${username}`);
        }else{
          res = await axios.get(`/posts/timeline/${user._id}`);
        }
        
        setPosts(res.data)
    }
    fetchPosts();
  }, [username , user]);

//-------------------------------------------------------------------------------------------------------------
// const { isPending , data , error } = useFetch('/posts/timeline/61fd65ee8052c274d6fca679')
// useEffect(()=>{
//   if(data!=null){
//   setPosts(data.data);
//   }
// },[data])
//--------------------------------------------------------------------------------------------------------------

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts && posts.map((post)=>(
                    <Post key={post._id} post = {post} />
                ))}
      </div>
    </div>
  );
};

export default Feed;
