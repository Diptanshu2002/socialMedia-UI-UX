import "./rightbar.css";

import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "../../hooks/axios";
import { Link } from "react-router-dom";

const Rightbar = ({ profile }) => {
  //followings
  const [getFollowings, setGetFollowings] = useState(null)

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //-----------------------------------------
  if(profile){
    useEffect(()=>{
      async function GetFollowings(){
        try{
          const friends = await axios.get(`/users/friends/${profile._id}`)
          console.log('fectching here :',friends.data)
          setGetFollowings(friends.data)
        }catch(error){
          console.log("send error.....", error)
        }
      }
      GetFollowings()
    },[profile._id])
  
    console.log('friends : ', getFollowings)
  }
  
  //-----------------------------------------
  function HomeRightBar() {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            {" "}
            <b>Pola foster </b> and <b>3 Others </b> have birthday today
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul>
      </>
    );
  }
  //
  //
  function ProfileRightBar() {
    //--------------------------------------------------------------
    
    //--------------------------------------------------------------
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{profile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{profile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {profile.relationship === 1
                ? "Single"
                : profile.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {getFollowings && getFollowings.map((following)=>(
          <Link key={following._id} to={`/profile/${following.username}`}>
            <div className="rightbarFollowing">
              <img
                src={following.profilePicture ? `${following.profilePicture}` : `${PF}person/noAvatar.png`}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{`${following.username}`}</span>
            </div>
          </Link>))}
            {/* not working as it sends a empty array which in true in nature */}
          {!getFollowings && (<p>Not followed anyone</p>)}
        </div>
      </>
    );
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;
