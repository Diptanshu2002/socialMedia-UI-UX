import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

//TOP-BAR FUNCTION
export default function Topbar() {

  const [open, setOpen] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //gives the logged in user details
  const { user } = useContext(AuthContext);

  function handleOpen(){
    if(!open){
      setOpen(true)
    }else{
      setOpen(false)
    }
  }

  useState(()=>{
    
  },[])
  //HTML CODE BELOW
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topbarCentre">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            onClick={handleOpen}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ textDecoration: "none"
            }} >
              <Chat />
              <span className="topbarIconBadge">1</span>
            </Link>  
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : `${PF}/person/noAvatar.png`
            }
            className="topbarImg"
            alt=""
          />
        </Link>
      </div>
      {open && 
        (<div className="search">
            <ul>
              <li>Ribhu</li>
              <li>Babai</li>
              <li>Reek</li>
            </ul>
        </div>)}
    </div>
  );
}
