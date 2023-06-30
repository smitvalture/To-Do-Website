import React, { useState, useEffect } from 'react';
import bg_img_light from '../assets/images/bg-desktop-light.jpg';
import bg_img_dark from '../assets/images/bg-desktop-dark.jpg';
import icon_sun from '../assets/images/icon-sun.svg';
import icon_moon from '../assets/images/icon-moon.svg';
import icon_check from '../assets/images/icon-check.svg';
import icon_cross from '../assets/images/icon-cross.svg';
import Tasks from '../components/Tasks';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle('dark', prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setList([...list, input]);
      setInput("");
    }
  };

  const handleDelete = (item) => {
    const updatedList = list.filter((task) => task !== item);
    setList(updatedList);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const droppedIndex = e.dataTransfer.getData('text/plain');
    const updatedList = [...list];
    const removedItem = updatedList.splice(droppedIndex, 1)[0];
    updatedList.splice(index, 0, removedItem);
    setList(updatedList);
  };

  return (
    <section className='w-screen h-screen flex flex-col justify-center items-center bg-[#d6e0ed] font-Josefin'>
      <div className='relative w-full h-[calc(100%-280px)] flex justify-center items-center overflow-hidden'>
        <img
          src={isDarkMode ? bg_img_dark : bg_img_light}
          alt="bg img"
          className='block absolute top-0 left-0 max-w-full min-w-[1500px] w-full h-80'
        />
      </div>
      <div className={`relative w-full h-full flex justify-center ${isDarkMode ? "bg-[#1e1e28]" : "bg-[#fafafa]"}`}>
        <div className='absolute -top-56 max-w-[650px] w-full h-full gap-6 flex flex-col items-center'>
          <div className='w-full flex justify-between items-center'>
            <h1 className={`text-${isDarkMode ? "gray-300" : "white"} text-6xl font-semibold tracking-[24px]`}>TODO</h1>
            <button onClick={toggleTheme}>
              {
                <img src={isDarkMode ? icon_sun : icon_moon} alt="theme icon" />
              }
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`w-full h-16 px-5 py-3 shadow-lg mt-2 flex gap-5 justify-center items-center ${isDarkMode ? "bg-[#2a2b3d]" : "bg-white"} rounded-md`}
          >
            <button
              onClick={() => setToggle(!toggle)}
              type='button'
              className={`w-[34px] h-8 flex justify-center items-center rounded-full ${toggle && "bg-gradient-to-br"} from-[#7bbbf9] to-[#9e7fec] border-2 ${isDarkMode ? "border-[#353648]" : "border-gray-300"}`}
            >
              {toggle && <img src={icon_check} alt="icon check" />}
            </button>
            <input
              className={`w-full h-full ${isDarkMode ? "text-gray-300" : "text-gray-500"} text-xl bg-transparent outline-none`}
              type="text"
              name="new_task"
              id="new_task"
              placeholder='Create new todo...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>

          <div
            className={`w-full min-h-[calc(100%-6px)] rounded-md shadow-2xl flex flex-col justify-between ${isDarkMode ? "bg-[#2a2b3d]" : "bg-white"}`}
          >
            <div
              className='overflow-y-scroll scrollbar-hide scroll-smooth'
              onDragOver={handleDragOver}
            >
              {list.map((item, index) => (
                <div
                  key={index}
                  className={`p-5 text-xl border-b flex gap-3 justify-between items-center ${isDarkMode ? "text-gray-300 border-gray-700" : "text-gray-700 border-gray-300"}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <Tasks item={item} isDarkMode={isDarkMode} onDelete={handleDelete} />
                </div>
              ))}
            </div>
            <div
              className={`w-full p-5 flex justify-between border-t ${isDarkMode ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-300"}`}
            >
              <p>{list.length} items left</p>
              <nav className='flex gap-4 ml-10'>
                <button className={`hover:text-gray-600`}>All</button>
                <button className={`hover:text-gray-600`}>Active</button>
                <button className={`hover:text-gray-600`}>Completed</button>
              </nav>
              <button type='button' className={`hover:text-gray-600`}>Clear completed</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
