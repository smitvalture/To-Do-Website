import React, { useState, useEffect } from 'react';
import bg_img_light from '../assets/images/bg-desktop-light.jpg';
import bg_img_dark from '../assets/images/bg-desktop-dark.jpg';
import bg_img_light_mobile from '../assets/images/bg-mobile-light.jpg';
import bg_img_dark_mobile from '../assets/images/bg-mobile-dark.jpg';
import icon_sun from '../assets/images/icon-sun.svg';
import icon_moon from '../assets/images/icon-moon.svg';
import icon_check from '../assets/images/icon-check.svg';
import Tasks from '../components/Tasks';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toggle, setToggle] = useState({});
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
    document.documentElement.classList.toggle('dark', prefersDarkMode);

    const storedList = localStorage.getItem("taskList");
    if (storedList) {
      try {
        const parsedList = JSON.parse(storedList); // Parse the JSON string
        setList(parsedList);
      } catch (error) {
        console.error("Error parsing storedList:", error);
        // Handle the error, such as setting a default value for the list
      }
    }
  }, []);


  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const updatedList = [...list, input];
      setList(updatedList);
      localStorage.setItem("taskList", JSON.stringify(updatedList)); // Convert to JSON string
      setInput("");
    }
  };


  const handleDelete = (item) => {
    const updatedList = list.filter((task) => task !== item);
    setList(updatedList);
    localStorage.setItem("taskList", JSON.stringify(updatedList));
    localStorage.removeItem(`toggle_${item}`);
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
    localStorage.setItem("taskList", JSON.stringify(updatedList));
  };

  useEffect(() => {
    list.forEach((item) => {
      const storedToggle = localStorage.getItem(`toggle_${item}`);
      if (storedToggle) {
        setToggle((prevToggle) => ({
          ...prevToggle,
          [item]: JSON.parse(storedToggle),
        }));
      }
    });
  }, [list]);

  const handleToggle = (item) => {
    const updatedToggle = !toggle[item];
    setToggle((prevToggle) => ({
      ...prevToggle,
      [item]: updatedToggle,
    }));
    localStorage.setItem(`toggle_${item}`, JSON.stringify(updatedToggle));
  };

  return (
    <section className={`relative w-screen h-screen flex flex-col md:justify-center items-center overflow-hidden ${isDarkMode ? "bg-[#1e1e28]" : "bg-[#fafafa]"} font-Josefin`}>
      <div className='w-full h-fit flex justify-center items-center'>
        <img
          src={isDarkMode ? bg_img_dark : bg_img_light}
          alt="bg img"
          className='hidden md:block absolute top-0 left-0 max-w-full min-w-[1500px] w-full h-fit'
        />
        <img
          src={isDarkMode ? bg_img_dark_mobile : bg_img_light_mobile}
          alt="bg img"
          className='block md:hidden absolute top-0 left-0 max-w-full w-full h-fit'
        />
      </div>


      <div className='absolute top-[70px] max-h-[calc(100%-250px)] px-6 pt-10 md:px-0 md:pt-0 md:max-w-[650px] w-full h-full gap-6 flex flex-col items-center'>
        <div className='w-full flex justify-between items-center'>
          <h1 className={`text-${isDarkMode ? "gray-300" : "white"} text-3xl md:text-6xl font-semibold tracking-[16px] md:tracking-[24px]`}>TODO</h1>
          <button onClick={toggleTheme}>
            {
              <img src={isDarkMode ? icon_sun : icon_moon} alt="theme icon" />
            }
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`w-full h-16 p-5 shadow-lg mt-2 flex gap-5 justify-center items-center ${isDarkMode ? "bg-[#2a2b3d]" : "bg-white"} rounded-md`}
        >
          <button
            onClick={() => handleToggle("input")}
            type='button'
            className={`w-[34px] h-8 flex justify-center items-center rounded-full ${toggle["input"] && "bg-gradient-to-br"} from-[#7bbbf9] to-[#9e7fec] border-2 ${isDarkMode ? "border-[#353648]" : "border-gray-300"}`}
          >
            {toggle["input"] && <img src={icon_check} alt="icon check" />}
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
          className={`w-full md:h-3/4 rounded-md shadow-2xl flex flex-col justify-between ${isDarkMode ? "bg-[#2a2b3d]" : "bg-white"}`}
        >
          <div
            className='overflow-y-scroll scrollbar-hide scroll-smooth'
            onDragOver={handleDragOver}
          >
            {list.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Tasks item={item} isDarkMode={isDarkMode} onDelete={handleDelete} toggle={toggle[item]} onToggle={() => handleToggle(item)} />
              </div>
            ))}
          </div>
          <div
            className={`w-full p-5 flex justify-between font-medium border-t ${isDarkMode ? "text-gray-500 border-gray-700" : "text-gray-400 border-gray-300"}`}
          >
            <p>{list.length} items left</p>
            <nav className='flex gap-4 ml-10'>
              <button className={`${isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"}`}>All</button>
              <button className={`${isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"}`}>Active</button>
              <button className={`${isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"}`}>Completed</button>
            </nav>
            <button type='button' className={`${isDarkMode ? "hover:text-gray-300" : "hover:text-gray-700"}`}>Clear completed</button>
          </div>
        </div>

      </div>
      <footer className={`h-full flex justify-center items-end mb-14 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Drag & Drop to reorder the list</footer>
    </section>
  );
};

export default Home;
