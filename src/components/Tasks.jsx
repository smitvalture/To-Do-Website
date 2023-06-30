import React, { useState } from 'react'
import icon_check from '../assets/images/icon-check.svg';

const Tasks = ({ item, isDarkMode }) => {

    const [toggle, setToggle] = useState(false);

    return (
        <>
            <button onClick={() => setToggle(!toggle)} className={`w-8 h-8 flex justify-center items-center rounded-full ${toggle && "bg-gradient-to-br"} from-[#7bbbf9] to-[#9e7fec] border-2 ${isDarkMode ? "border-[#353648]" : "border-gray-300]"}`}>
                {toggle && <img src={icon_check} alt="icon check" />}
            </button>
            <p className={`ml-2 ${toggle && "line-through"}`}>{item}</p>
        </>
    )
}

export default Tasks