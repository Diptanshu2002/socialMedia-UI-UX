import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Send,
  ContactSupportOutlined,
} from "@material-ui/icons";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

import axios from "../../hooks/axios";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase/firebaseConfig'

const Share = () => {

  //capturing the upload progess
  const [progressBar, setProgressBar] = useState(0);

  //getting user from the authContext
  const { user } = useContext(AuthContext);

  //getting input from the form
  const [file, setFile] = useState(null);
  const desc = useRef();


  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const hello = 'modified'
  async function handleSubmit(e){
    e.preventDefault();
    const newPost = {
      userId : user._id,
      desc : desc.current.value,
      img : ''
    }
    if(file){

      const fileName = Date.now() + file.name;
      const data = new FormData()
     
      const sotrageRef = ref(storage, `img/${fileName}`);
      const uploadTask = uploadBytesResumable(sotrageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressBar(prog);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            newPost.img = downloadURL;
            try {
              await axios.post('/posts/post', newPost)
            }catch (error) {
              console.log("/posts", error)}
            console.log("newPost: ", newPost);
          });
        }
      );
    setProgressBar(0); 
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : `${PF}/person/noAvatar.png`
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username}`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            
            <label htmlFor="file" className="shareOption">
              <PermMedia style={{ color: "#219F94" }} className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                name="file"
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="shareOption">
              <Label style={{ color: "#548CFF" }} className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room style={{ color: "#FF1700" }} className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions
                style={{ color: "#EEC373" }}
                className="shareIcon"
              />
              <span className="shareOptionText">Emotion</span>
            </div>
          </div>
          <button className="shareSendButton">
            <Send className="shareSendIcon" type='submit' style={{ color: "#113CFC" }} />
          </button>
        </form>
        {/* {progressBar && <progress id="img-progress" value={`${progressBar}`} max="100">100%</progress>} */}
      </div>
    </div>
  );
};

export default Share;
