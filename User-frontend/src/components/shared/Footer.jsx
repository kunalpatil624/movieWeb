import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className='px-6 md:px-16 lg:px-36 mt-20 w-full text-gray-300 pb-14'>
      <div className='border-b border-gray-500 '>
      <div className='flex flex-col md:flex-row justify-between w-full gap-10 '>
        <div className='w-96'>
          <img className='w-35' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png" alt="company logo" />
          <p className='mt-6 text-sm w-xs md:w-sm'>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
          <div className='flex items-center gap-3 mt-4'>
            <img className='h-9 w-auto' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754559720/Unconfirmed_255162_lacb04.png" alt="play-store-dw" />
            <img className='h-9 w-auto' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754559467/apple-store-logo-png-1-transparent_py80uq.png" alt="apple-store-dw" />
          </div>
        </div>

        <div className='flex items-start md:justify-end mb-10 gap-10 md:gap-40'>
          <div>
            <p className='mb-5'>Company</p>
            <ul>
              <li className='mb-1'><a href="">Home</a></li>
              <li className='mb-1'><a href="">About us</a></li>
              <li className='mb-1'><a href="">Contact us</a></li>
              <li className='mb-1'><a href="">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h2 className='mb-5'>Get in touch</h2>
            <p className='mb-2'>+1-626511-5032</p>
            <p>contact@example.com</p>

            {/* Theater Request Button */}
            <button 
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
              onClick={() => navigate('/theater-request')}
            >
              Request Theater
            </button>
          </div>
        </div>
      </div >
      <div className='mb-10'>
        <div className="flex justify-center space-x-6 text-xl mb-2">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebook />
          </a>
        </div>
        <p className="text-xs text-center text-gray-600">
          © {new Date().getFullYear()} JobFind. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  );
}

export default Footer
