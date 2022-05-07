import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import { useState, useEffect } from "react";
import axios from "../../hooks/axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username, home }) => {
  
  const [posts, setPosts] = useState([]);
  const { user }= useContext(AuthContext);
  console.log("current user in authcontext" , user,"\n profile page user:",username);

  //functions
  //sorting link using date
  const sortByDate = arr => {
    const sorter = (a, b) => {
       return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    arr.sort(sorter);
    arr = arr.reverse()
 };

  //fetching data from data-base
  useEffect(() => {
    const fetchPosts = async()=> {
        let res = []
        if(username){
           res = await axios.get(`/posts/profile/${username}`);
        }else{
          res = await axios.get(`/posts/timeline/${user._id}`);
        }
        
       // getting all the post
       let allPost = res.data
       //calling sortByDate function
       sortByDate(allPost)
       setPosts(allPost)
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
        {(username === user.username) || home  ? <Share /> : console.log("different user page")}
        {posts && posts.map((post)=>(
                    <Post key={post._id} post = {post} />
                ))}
      </div>
    </div>
  );
};

export default Feed;
