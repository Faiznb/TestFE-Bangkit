import avatar from "../assets/profile.jpg";
import { BiSolidUser } from "react-icons/bi";

const Header = ({ role, profileData, loading, error }) => {
  return (
    <div className="font-roboto flex justify-end items-center p-4 sticky top-0 bg-slate-100">
      <div className="flex items-center space-x-2">
        {role === "admin" ? (
          <>
            <span>Admin</span>
            <div className="w-8 h-8 rounded-full border border-black flex justify-center items-center">
              <BiSolidUser size={20} />
            </div>
          </>
        ) : loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <span>{profileData.user_name}</span>
            <img src={profileData.user_img || avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
