import React from 'react'

const Footer = () => {
  return (
    <footer className='px-6 md:px-16 lg:px-36 mt-40 w-full text-gray-300'>
      <div className='flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14'>
      <div className='w-96'>
        <img className='w-35' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754556239/ChatGPT_Image_Aug_7_2025_02_09_46_PM_vzt1bq.png" alt="comapny logo" />
        <p className='mt-6 text-sm w-auto'>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <div className='flex items-center gap-3 mt-4'>
          <img className='h-9 w-auto' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754559720/Unconfirmed_255162_lacb04.png" alt="play-store-dw" />
          <img className='h-9 w-auto' src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1754559467/apple-store-logo-png-1-transparent_py80uq.png" alt="apple-store-dw" />
        </div>
      </div>
      <div className='flex-1 flex items-start md:justify-end gap-20 md:gap-40'>
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
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer