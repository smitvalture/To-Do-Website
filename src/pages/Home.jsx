import React, { useState, useEffect } from 'react';
import bg_img_light from '../assets/images/bg-desktop-light.jpg';
import bg_img_dark from '../assets/images/bg-desktop-dark.jpg';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle('dark', prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <section className='w-screen h-screen flex flex-col justify-center items-center bg-[#d6e0ed]'>
      <div className='relative w-full h-3/5 flex justify-center items-center overflow-hidden'>
        <img
          src={isDarkMode ? bg_img_dark : bg_img_light}
          alt="bg img"
          className='block absolute top-0 left-0 max-w-full min-w-[1500px] w-full h-80'
        />
      </div>
      <div className={`relative w-full h-full flex justify-center ${isDarkMode ? "bg-[#1e1e28]" : "bg-[#fafafa]"}`}>
        <div className='absolute -top-56 max-w-[700px] w-full h-full flex flex-col items-center'>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
