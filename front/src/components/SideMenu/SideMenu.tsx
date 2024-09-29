import { useState } from 'react';
import { IoEarth } from 'react-icons/io5';
import NavList from '../NavList/NavList';
import NavListButtom from '../NavListButtom/NavList';

const SideMenu = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleMenu} className="p-2 bg-blue-500 text-white">
        {isVisible ? 'Hide Menu' : 'Show Menu'}
      </button>
      {isVisible && (
        <div className="w-62 pt-8 bg-blue-300 text-blue-900 flex flex-col justify-between min-h-screen">
          <div>
            <h1 className="flex justify-center px-4 text-2xl font-bold">
              <IoEarth className='size-10' />
            </h1>
            <NavList />
          </div>
          <NavListButtom />
        </div>
      )}
    </div>
  );
};

export default SideMenu;