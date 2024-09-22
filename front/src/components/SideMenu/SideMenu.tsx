import { IoEarth } from 'react-icons/io5';
import NavList from '../NavList/NavList';
import NavListButtom from '../NavListButtom/NavList';

const SideMenu = () => {
  return (
    <div className="w-62 pt-8 bg-blue-300 text-blue-900 flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="flex justify-center px-4 text-2xl font-bold">
          <IoEarth className='size-10' />
        </h1>
        <NavList />
      </div>
      <NavListButtom />
    </div>
  );
};

export default SideMenu;