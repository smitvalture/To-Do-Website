import React, { useState, useEffect } from 'react';
import icon_check from '../assets/images/icon-check.svg';
import icon_cross from '../assets/images/icon-cross.svg';

const Tasks = ({ item, isDarkMode, onDelete }) => {
    const [toggle, setToggle] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const storedToggle = localStorage.getItem(`toggle_${item}`);
        if (storedToggle) {
            setToggle(JSON.parse(storedToggle));
        }
    }, [item]);

    const handleToggle = () => {
        const updatedToggle = !toggle;
        setToggle(updatedToggle);
        localStorage.setItem(`toggle_${item}`, JSON.stringify(updatedToggle));
    };

    const handleDelete = () => {
        onDelete(item);
        localStorage.removeItem(`toggle_${item}`);
    };

    return (
        <div
            className={`p-5 text-xl cursor-move border-b flex gap-3 justify-between items-center ${isDarkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-300'} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                onClick={handleToggle}
                className={`md:w-9 w-8 h-[26px] md:h-8 cursor-pointer flex justify-center items-center rounded-full ${toggle && 'bg-gradient-to-br'} from-[#7bbbf9] to-[#8064c6] border-2 ${isDarkMode ? 'border-[#353648]' : 'border-gray-300'}`}
            >
                {toggle && <img src={icon_check} alt="icon check" />}
            </div>
            <p className={`ml-2 pt-2 w-full ${toggle && 'line-through text-gray-500'}`}>{item}</p>
            {
                isHovered && <div
                    className={`hidden lg:block z-10 cursor-pointer transition-opacity duration-500`}
                    onClick={handleDelete}
                >
                    <img src={icon_cross} alt="cross icon" />
                </div>
            }
            <div
                className={`block lg:hidden z-10 cursor-pointer transition-opacity duration-500`}
                onClick={handleDelete}
            >
                <img src={icon_cross} alt="cross icon" />
            </div>

        </div>
    );
};

export default Tasks;
