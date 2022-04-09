import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../hooks/axios";
export default function Profile() {

  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  //getting url params
  const { username } = useParams()
  
  //getting data of user from database
  useEffect(() => {
    async function fetchUser() {
      const user = await axios(`/users?username=${username}`);
      setUser(user.data);
    }
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || `${PF}person/noCover.png`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={user.profilePicture ? PF+user.profilePicture :`${PF}/person/noAvatar.png`}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username = {username}/>
            <Rightbar profile = {user}  />
          </div>
        </div>
      </div>
    </>
  );
}
