import './friends.css'
const Friends = ({user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebarFriend">
                <img  className="sidebarFriendImage" src={PF + user.profilePicture} alt="" />
                <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}

export default Friends;
