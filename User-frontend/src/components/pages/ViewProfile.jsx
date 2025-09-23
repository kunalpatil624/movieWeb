import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import EditableField from "../comonent/EditableField";
import { GrEdit } from "react-icons/gr";
const ViewProfile = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="px-3 md:px-16 lg:px-24 xl:px-44 overflow-hidden my-40">
      
      <div className=" gap-8 shadow-1xl shadow-blue-200 rounded-2xl shadow-xl text-center px-0 md:px-9 mx-5 mb-10">
        <div className="flex flex-col md:flex-row gap-8">
       <div className="p-2">
        <div className="relative w-28 h-28 mt-10">
  {user?.imageUrl ? (
    <img
      src={user.imageUrl}
      alt="profile"
      className="w-28 h-28 rounded-full shadow-lg border-4 border-red-800 object-cover"
    />
  ) : (
    <div className="w-28 h-28 rounded-full shadow-lg border-4 border-red-800  flex items-center justify-center text-xl font-bold text-white">
      {user?.fullName
        ? `${user.fullName.split(" ")[0][0]}${user.fullName.split(" ")[1]?.[0] || ""}`
        : "U"} {/* U for unknown */}
    </div>
  )}

  <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-200">
    <GrEdit className="w-5 h-5 text-gray-700" />
  </button>
</div>


        <div className="text-left">
          <h2 className="font-bold text-2xl text-gray-800">
            {user?.fullName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-2 text-sm text-gray-600">
          🎭 Role: {user?.role || "user"}
          </p>
          {/* <div className="flex justify-around mt-6">
            <div>
              <p className="font-bold text-lg">65</p>
              <span className="text-sm text-gray-500">Movies</span>
            </div>
            <div>
              <p className="font-bold text-lg">43</p>
              <span className="text-sm text-gray-500">Shows</span>
            </div>
            <div>
              <p className="font-bold text-lg">21</p>
              <span className="text-sm text-gray-500">Total pay</span>
            </div>
          </div> */}

          {/* Button */}
          <button className="mt-6 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md transition">
            Show more
          </button>
        </div>
        </div>
      <div className='relative  w-full'>
         <div className="bg-black w-auto mx-5 mt-5 p-3">
            <p className="text-left">Public Profile Information</p>
         </div>
         <div className="hover:bg-black w-auto mx-5 p-3">
            <div className="block flex justify-between items-center mb-2">
              <div><label className="block text-sm font-medium text-left opacity-50 ">USERNAME</label></div>
              <div><Button variant='link' className="text-[#c2800e] hover:text-white text-sm">Go to Account Settings</Button></div>
            </div>
            <div> 
                <p className="text-left">{user.fullName}</p>
            </div>
         </div>
         <div>
            <EditableField value={user.fullName} lable="full name" helperText="Help friends discover you on Plex with whatever name that you’re best known by. For instance: your full name or a nickname."/>
         </div>
         <div>
            <EditableField value={user.bio} lable='bio' helperText='Share something about yourself. Try starting with some of your favorite movies, genres, and TV shows!' placeholder='Add a description about yourself'/>
         </div>
         <div>
            <EditableField value={user.location} lable='location' helperText='Adding location to your profile lets friends know where you are in this big beautiful world.' placeholder='Add your location'/>
         </div>
          <div>
            <EditableField value={user.website} lable='link' helperText='Provide a link on your profile for a personal website or social media profile.' placeholder='Add website'/>
         </div>
      </div>
       </div>
      </div>
    </div>
  );
};

export default ViewProfile;
