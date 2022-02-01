import './share.css'
import { PermMedia, Label, Room, EmojiEmotions, Send } from '@material-ui/icons'

const Share = () => {
    return (
        <div className='share'>
           <div className="shareWrapper">
               <div className="shareTop">
                   <img className='shareProfileImg' src="./assets/person/1.jpeg" alt="" />
                   <input placeholder="What's in your mind Kirito" className='shareInput' />
               </div>
               <hr className='shareHr' />
               <div className="shareBottom">
                   <div className="shareOptions">
                       <div className="shareOption">
                           <PermMedia  style={{ color: "#219F94" }}  className='shareIcon' />
                           <span className='shareOptionText'>Photo or Video</span>
                       </div>
                       <div className="shareOption">
                           <Label style={{ color: "#548CFF" }}  className='shareIcon' />
                           <span className='shareOptionText'>Tag</span>
                       </div>
                       <div className="shareOption">
                           <Room  style={{ color: "#FF1700" }} className='shareIcon' />
                           <span className='shareOptionText'>Location</span>
                       </div>
                       <div className="shareOption">
                           <EmojiEmotions style={{ color: "#EEC373" }}  className='shareIcon' />
                           <span className='shareOptionText'>Emotion</span>
                       </div>
                   </div>
                    <button className='shareSendButton'><Send className='shareSendIcon' style={{ color: "#113CFC" }} /></button>
               </div>
           </div>
        </div>
    );
}

export default Share;
