import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-6 pt-16">
      <div className="max-w-3xl mt-5 text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-red-500">About CineFlixX</h1>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Welcome to <span className="font-semibold text-white">CineFlixX</span> — 
          a smart and modern web platform designed to make movie ticket booking fast,
          easy, and convenient. Yeh project specially college ke liye banaya gaya hai
          jahan users latest movies dekh sakte hain, show timings check kar sakte hain,
          aur apni favorite movie ke tickets book kar sakte hain — all in one place.
        </p>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          CineFlixX ka main goal hai movie lovers ke liye ek aisi website banana 
          jo user-friendly ho, fast chale aur real booking experience de. 
          Is platform par har feature carefully design kiya gaya hai taaki 
          users easily explore aur book kar sakein without any hassle.
        </p>

        <div className="mt-10 bg-gray-900 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-2">👨‍💻 Developed By</h2>
          <p className="text-gray-300">Kunal Patil</p>
          <p className="text-gray-400 text-sm mt-1">B.Tech - Computer Science & Engineering</p>
          <p className="text-gray-400 text-sm">Jawaharlal Institute of Technology, Borawan</p>
        </div>

        <p className="mt-10 text-gray-400 text-sm">
          © {new Date().getFullYear()} CineFlixX | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
