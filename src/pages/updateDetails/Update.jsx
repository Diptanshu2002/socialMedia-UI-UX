import "./update.css";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar" 
import { useContext, useState } from "react";

//firebase------------------------------------
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";

//---------------------------------------------

import axios from "../../hooks/axios";

export default function Update() {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const [desc, setDesc] = useState(user.desc);
  const [city, setCity] = useState(user.city);
  const [from, setFrom] = useState(user.from);

  const [progressBar, setProgressBar] = useState(0)

  const [done, setDone] = useState(false);

  async function handleSubmitForm(e){
      setDone(false)
      e.preventDefault()
      const updateUser = {
          userId : user._id,
          username,
          desc,
          city,
          from,
      }
      try {
          await axios.put(`/users/${user._id}`, updateUser)
      } catch (error) {
          console.log(error)
      }


      if(profilePicture){
          const filename1 = Date.now() + profilePicture.name;

          const storageRef =  ref(storage, `profile/${filename1}`);
          
          const uploadTask = uploadBytesResumable(storageRef, profilePicture)

          uploadTask.on(
              "state_changed",

              (snapshot)=>{
                const prog = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressBar(prog);
              },

              (error)=>console.log(error),

              async()=>{
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                 
                await axios.put(`/users/${user._id}`,
                { 
                    userId : user._id,
                    profilePicture : downloadUrl
                })
                setProfilePicture(null);
              }
          )
      }



    if(coverPicture){
        const filename1 = Date.now() + coverPicture.name;

        const storageRef =  ref(storage, `cover/${filename1}`);
        
        const uploadTask = uploadBytesResumable(storageRef, coverPicture)

        uploadTask.on(
            "state_changed",

            (snapshot)=>{
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgressBar(prog);
            },

            (error)=>console.log(error),

            async()=>{
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
               
              await axios.put(`/users/${user._id}`,
              { 
                  userId : user._id,
                  coverPicture : downloadUrl
              })
              setCoverPicture(null);
            }
        )
    }

    setDone(true)
  }

  return (
    <div className="update" >
        <Topbar/>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="name">
          <span>Name :</span>
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label htmlFor="desc">
          <span>Description :</span>
          <input
            type="text"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>

        <label htmlFor="city">
          <span>City :</span>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label htmlFor="from">
          <span>From :</span>
          <input
            type="text"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label htmlFor="cp">
          <span>Profile Picture :</span>
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            name="cp"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </label>

        <label htmlFor="cp">
          <span>Cover Picture :</span>
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            name="cp"
            onChange={(e) => setCoverPicture(e.target.files[0])}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {done && (<div>User Profile Updated</div>)}
    </div>
  );
}
